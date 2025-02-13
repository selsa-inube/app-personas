import { useState } from "react";
import { DateFieldUI } from "./interface";
import { InputSize, InputState } from "./types";

interface DateFieldProps {
  id: string;
  name: string;
  label?: string;
  disabled?: boolean;
  max?: string;
  min?: string;
  step?: string;
  value?: string;
  readonly?: boolean;
  required?: boolean;
  message?: string;
  validMessage?: string;
  fullwidth?: boolean;
  isFocused?: boolean;
  isTouched?: boolean;
  state?: InputState;
  size?: InputSize;
  initialValue?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

function DateField(props: DateFieldProps) {
  const {
    label,
    name,
    id,
    disabled = false,
    max,
    min,
    step,
    value,
    readonly,
    required,
    message,
    validMessage,
    fullwidth = false,
    state = "pending",
    size = "compact",
    onFocus,
    onBlur,
    onChange,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [initialValue] = useState(value);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (!readonly) {
      setIsTouched(true);
      setIsFocused(true);
    }
    onFocus && onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    selectedDate.setDate(selectedDate.getDate() + 1);
    selectedDate.setHours(0, 0, 0, 0);

    const newEvent = {
      ...e,
      target: {
        ...e.target,
        id: e.target.id,
        name: e.target.name,
        value: selectedDate.toISOString(),
      },
    };

    onChange && onChange(newEvent);
  };

  return (
    <DateFieldUI
      label={label}
      name={name}
      id={id}
      disabled={disabled || readonly}
      max={max}
      min={min}
      step={step}
      value={value}
      required={required}
      message={message}
      validMessage={validMessage}
      fullwidth={fullwidth}
      state={state}
      size={size}
      initialValue={initialValue}
      isFocused={isFocused}
      isTouched={isTouched}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}

export { DateField };
export type { DateFieldProps };
