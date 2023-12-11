import { useCallback, useState } from "react";

interface ButtonProps {
  label: string;
  text: string;
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
// Presentation
export const Button = (props: ButtonProps) => {
  const { label, text, disabled, onClick } = props;

  return (
    <div>
      <span>{label}</span>
      <button disabled={disabled} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

interface CountButtonProps {
  label: string;
  maximum: number;
}

// Container

const usePopup = () => {
  const cb = useCallback((text: string) => {
    prompt(text);
  }, []);
  return cb;
};
export const CountButton = (props: CountButtonProps) => {
  const { label, maximum } = props;

  const displayPopup = usePopup();

  const [count, setCount] = useState(0);

  const onClick = useCallback(() => {
    const newCount = count + 1;
    setCount(newCount);
    if (newCount >= maximum) {
      displayPopup(`너는 ${newCount}번 클릭했다.`);
    }
  }, [count, maximum]);

  const disabled = count >= maximum;
  const text = disabled
    ? "더 이상 클릭할 수 없습니다"
    : `너는 ${count}번 클릭했어`;

  const buttonProps = {
    label,
    onClick,
    disabled,
    text,
  };

  return <Button {...buttonProps}></Button>;
};
