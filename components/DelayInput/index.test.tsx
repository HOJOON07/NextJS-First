import {
  render,
  screen,
  RenderResult,
  fireEvent,
} from "@testing-library/react";
import { DelayInput } from ".";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

describe("DelayInput", () => {
  let renderResult: RenderResult;
  let handleChange: jest.Mock;

  beforeEach(() => {
    // handleChange = jest.fn(() => {
    //   console.log("핸들 체인지 실행!");
    // });

    handleChange = jest.fn();

    renderResult = render(<DelayInput onChange={handleChange}></DelayInput>);
    jest.useFakeTimers();
  });

  afterEach(() => {
    renderResult.unmount();
  });

  it("Should display empty in span on initial render", () => {
    const spanNode = screen.getByTestId("display-text") as HTMLSpanElement;
    // expect(spanNode).toBeInTheDocument();
    expect(spanNode).toHaveTextContent("입력한 텍스트:");
  });

  // 테스트 케이스 2 : onChange 이베트가 발생한 직후 span이 입력 중 ...이라고 표시하는지 확인한다.

  it("should display 입력 중... immediately after onChange event occurs", () => {
    const inputText = "Test Input Text";
    const inputNode = screen.getByTestId("input-text") as HTMLInputElement;

    fireEvent.change(inputNode, {
      target: {
        value: inputText,
      },
    });
    const spanNode = screen.getByTestId("display-text") as HTMLSpanElement;
    expect(spanNode).toHaveTextContent("입력 중...");
    jest.useFakeTimers();
  });

  // 테스트 케이스 3 : 입력한 뒤 1초 후에 입력한 내용이 span에 표시 되는지 확인한다.

  // 테스트 중에 1초를 기다리게 하는 방법?? ->
  // jest의 타이머 목을 사용하는데 실제 기다리지 않고 타이머의 콜백을 실행한다.
  // 1.테스트 전에는 jest.useFakeTimers()를 호출하고 타이머를 목의 타이머로 교체한뒤
  // 2.테스트 후에는 jest.useFakeTimers()를 호출해 타이머를 되돌린다.
  // 3.테스트 도중 타이머가 설정된 후에 jest.runAllTimers()를 실행하면 타이머의 콜백을 실행한다.

  //  act함수 직후에 화면에 그리는 내용을 확인할 수 있다.
  it("should display input text 1second after onChange event occurs", async () => {
    const inputText = "Test Input Text";
    const inputNode = screen.getByTestId("input-text") as HTMLInputElement;

    fireEvent.change(inputNode, {
      target: {
        value: inputText,
      },
    });

    await act(async () => {
      jest.runAllTimers();
    });

    const spanNode = screen.getByTestId("display-text") as HTMLSpanElement;

    expect(spanNode).toHaveTextContent(`입력한 텍스트:${inputText}`);
  });

  // 테스트 케이스 4 : onChange 호출 여부를 확인하는 테스트

  it("should call on onChage after onChange event occurs", async () => {
    const inputText = "Test Input Text";
    const inputNode = screen.getByTestId("input-text") as HTMLInputElement;

    fireEvent.change(inputNode, {
      target: {
        value: inputText,
      },
    });

    await act(async () => {
      jest.runAllTimers();
    });

    expect(handleChange).toHaveBeenCalled();
  });
});
