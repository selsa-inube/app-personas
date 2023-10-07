import { useState } from "react";
import { ITextareaProps, Textarea } from "..";

const TextareaController = (props: ITextareaProps) => {
  const { value = "", maxLength = 0 } = props;
  const [form, setForm] = useState({ value });

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ value: e.target.value });
    return;
  };

  const onFocus = () => {
    setForm(form);
    console.log("onFocus event");
  };

  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setForm(form);
    console.log("onBlur event");
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
