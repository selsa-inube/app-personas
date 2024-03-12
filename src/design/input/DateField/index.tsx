import { useState } from "react";
import { DateFieldUI } from "./interface";
import { InputSize, InputState } from "./types";

interface DateFieldProps {
  id: string;
  name: string;
  label?: string;
  isDisabled?: boolean;
  max?: string;
  min?: string;
  step?: string;
  value?: string;
  readOnly?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  validMessage?: string;
  isFullWidth?: boolean;
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
    isDisabled = false,
    max,
    min,
    step,
    value,
    readOnly,
    isRequired,
    errorMessage,
    validMessage,
    isFullWidth = false,
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
    if (!readOnly) {
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
    const selectedDate = new Date(`${e.target.value}T00:00`);
    console.log(selectedDate);
    onChange && onChange(e);
  };

  return (
    <DateFieldUI
      label={label}
      name={name}
      id={id}
      isDisabled={isDisabled}
      max={max}
      min={min}
      step={step}
      value={value}
      readOnly={readOnly}
      isRequired={isRequired}
      errorMessage={errorMessage}
      validMessage={validMessage}
      isFullWidth={isFullWidth}
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
