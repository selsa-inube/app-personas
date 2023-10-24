import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { Textarea, TextareaProps } from "..";

const TextareaController = (props: TextareaProps) => {
  const { value = "", maxLength = 0 } = props;
  const [text, setText] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    return;
  };

  const handleFocus = () => {
    action("onFocus event");
  };

  const handleBlur = () => {
    action("onBlur event");
  };

  return (
    <Textarea
      {...props}
      value={text}
      maxLength={maxLength}
      handleChange={handleChange}
      handleFocus={handleFocus}
      handleBlur={handleBlur}
    />
  );
};

export { TextareaController };
