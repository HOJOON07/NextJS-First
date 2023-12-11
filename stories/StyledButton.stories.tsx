import { ComponentStory, Meta, StoryFn } from "@storybook/react";
import { StyledButton } from "../components/StyledButton";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
export default {
  title: "StyledButton",
  component: StyledButton,
  // argTypes: { onClick: { action: "clicked" } },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "success", "transparent"],
    },
    children: {
      control: { type: "text" },
    },
  },
} as Meta<typeof StyledButton>;

const Template: StoryFn<typeof StyledButton> = (args) => {
  return <StyledButton {...args}></StyledButton>;
};

export const TemplateTest = Template.bind({});

TemplateTest.args = {
  variant: "primary",
  children: "Primary",
};

const incrementAction = action("increment");

export const Primary = (props: any) => {
  const [count, setCount] = useState(0);
  const onClick = (e: React.MouseEvent) => {
    incrementAction(e, count);
    setCount((prev) => prev + 1);
  };
  return (
    <StyledButton {...props} variant="primary" onClick={onClick}>
      Primary
    </StyledButton>
  );
};

export const Success = (props: any) => {
  return (
    <StyledButton {...props} variant="success">
      Primary
    </StyledButton>
  );
};
export const Transparent = (props: any) => {
  return (
    <StyledButton {...props} variant="transparent">
      Transparent
    </StyledButton>
  );
};
