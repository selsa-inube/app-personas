import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { Textarea, TextareaProps } from "..";

const TextareaController = (props: TextareaProps) => {
  const { value = "", maxLength = 0 } = props;
  const [form, setForm] = useState({ value });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ value: e.target.value });
    return;
  };

  const handleFocus = () => {
    setForm(form);
    action("onFocus event");
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setForm(form);
    action("onBlur event");
  };

  return (
    <Textarea
      {...props}
      value={form.value}
      maxLength={maxLength}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export { TextareaController };
