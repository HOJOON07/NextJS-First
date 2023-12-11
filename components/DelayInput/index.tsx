import { useCallback, useRef, useState } from "react";

type DelayButtonProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const DelayInput = (props: DelayButtonProps) => {
  const { onChange } = props;
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [viewValue, setViewValue] = useState("");
  // ReturnType은 함수 타입의 반환 타입으로 구성된 타입을 생성한다.
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      //입력중으로 바꿔서 true 넣어줌
      setIsTyping(true);
      //인풋에 표시할 텍스트 업데이트
      setInputValue(e.target.value);

      // 이전에 설정한 타이머가 있다면 먼저 해제
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
      //1초 후에 실행하는 타이머 설정
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        // 입력중인 플래그를 해제
        setIsTyping(false);
        setViewValue(e.target.value);
        //onchage 콜백 호출
        onChange(e);
      }, 1000);
    },
    [onChange]
  );

  const text = isTyping ? "입력 중..." : `입력한 텍스트:${viewValue}`;

  return (
    <div>
      <input
        data-testid="input-text"
        value={inputValue}
        onChange={handleChage}
      ></input>
      <span data-testid="display-text">{text}</span>
    </div>
  );
};
