import { useState } from "react";
import { ITextareaProps, Textarea } from "..";
import { action } from "@storybook/addon-actions";

const TextareaController = (props: ITextareaProps) => {
  const { value = "", maxLength = 0 } = props;
  const [form, setForm] = useState({ value });

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ value: e.target.value });
    return;
  };

  const onFocus = () => {
    setForm(form);
    action("onFocus event");
  };

  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setForm(form);
    action("onBlur event");
  };

  return (
    <Textarea
      {...props}
      value={form.value}
      maxLength={maxLength}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export { TextareaController };
