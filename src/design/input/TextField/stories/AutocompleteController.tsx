import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { TextField, TextFieldProps } from "..";

const AutocompleteController = (props: TextFieldProps) => {
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    return;
  };

  const handleFocus = () => {
    setText(text);
    action("onFocus event");
  };

  const handleBlur = () => {
    setText(text);
    action("onBlur event");
  };

  return (
    <TextField
      {...props}
      value={text}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export { AutocompleteController };
