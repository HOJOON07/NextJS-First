import { useState } from "react";
// 각 요쇼의 태그 이름을 속성과 자식타입으로 매핑한다.
// 제네릭을 요구 하는 공통 컴포넌트 작성시엔 컴포넌트에 명확한 지정을 위해 해당 intrinsicElements에 대해서 알아두어야 할 것 같다.
type InPutProps = JSX.IntrinsicElements["input"] & {
  label: string;
};
export const Input = (props: InPutProps) => {
  const { label, ...rest } = props;

  const [text, setText] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setText(value);
  };

  const restInputField = () => {
    setText("");
  };
  return (
    <div>
      <label htmlFor={props.id}>{label}</label>
      <input
        {...rest}
        type="text"
        value={text}
        onChange={onInputChange}
        aria-label={label}
      />
      <button onClick={restInputField}></button>
    </div>
  );
};
