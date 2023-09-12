import React from "react";
import { useRef } from "react";
import Child from "./Child";
import TextBox from "../../../component/textBox";
import { useState } from "react";
import { emailRegex, phoneRegex } from "../../../until/regex";

export const Role = () => {
  const refText = useRef(null);
  const [data, setData] = useState({
    test: "",
    test2: "",
  });

  const handleCopyClipboard = () => {
    const text = refText.current.innerText;
    navigator.clipboard.writeText(text);
  };

  const onChange = (type, e) => {
    setData({ ...data, [type]: e.target.value });
  };
  return (
    <React.Fragment>
      <p ref={refText}>aaaaaa</p>
      <button onClick={handleCopyClipboard}>a</button>
      <Child textRef={refText} />
      <TextBox
        name="test"
        label={"test"}
        isRequired
        value={data.test}
        onChange={onChange}
        regex={emailRegex}
      />
      <TextBox
        name="test2"
        label={"test2"}
        value={data.test2}
        onChange={onChange}
        regex={phoneRegex}
      />
    </React.Fragment>
  );
};
