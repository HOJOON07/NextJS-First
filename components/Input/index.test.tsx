import {
  render,
  screen,
  RenderResult,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from ".";

describe("Input", () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<Input id="username" label="Username"></Input>);
  });

  afterEach(() => {
    renderResult.unmount();
  });

  it("should show input text", () => {
    const inputText = "Test Input Text";
    const inputNode = screen.getByLabelText("Username") as HTMLInputElement;
    // fireEvent를 사용해서 Onchage를 트리거한다.
    // 두번재 인수인 객체 안에 입력할 문자열을 저장한다.
    fireEvent.change(inputNode, { target: { value: inputText } });
    // 버튼은 인풋처럼 라벨 요소가 없기 때문에 getByRole을 사용한다.
    // const buttonNode = screen.getByRole("button", {
    //   name: "Reset",
    // }) as HTMLButtonElement;

    // fireEvent.click(buttonNode);

    expect(inputNode).toHaveValue(inputText);
  });
});
