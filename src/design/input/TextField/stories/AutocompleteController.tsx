import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { TextField, TextFieldProps } from "..";

const AutocompleteController = (props: TextFieldProps) => {
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    return;
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setText(text);
    action("onFocus event");
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setText(text);
    action("onBlur event");
  };

  return (
    <TextField
      {...props}
      value={text}
      handleChange={handleChange}
      handleFocus={handleFocus}
      handleBlur={handleBlur}
    />
  );
};

export { AutocompleteController };
