import { useState } from "react";
import { DropdownItemProps } from "../DropdownItem";
import { TextFieldUI } from "./interface";
import {
  InputSize,
  InputState,
  InputType,
  inputStates,
  inputTypes,
} from "./types";

interface TextFieldProps {
  label?: string;
  name: string;
  id: string;
  placeholder: string;
  isDisabled?: boolean;
  value?: string | number;
  iconBefore?: React.JSX.Element;
  iconAfter?: React.JSX.Element;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  isRequired?: boolean;
  errorMessage?: string;
  validMessage?: string;
  isFullWidth?: boolean;
  readOnly?: boolean;
  isFocused?: boolean;
  type?: InputType;
  state?: InputState;
  size?: InputSize;
  autocomplete?: boolean;
  suggestions?: DropdownItemProps[];
  autocompleteChars?: number;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

function TextField(props: TextFieldProps) {
  const {
    label,
    name,
    id,
    placeholder,
    isDisabled = false,
    type = "text",
    state = "pending",
    size,
    value,
    handleChange,
    iconBefore,
    iconAfter,
    maxLength,
    minLength,
    max,
    min,
    isRequired = false,
    errorMessage,
    validMessage,
    isFullWidth = false,
    handleFocus,
    handleBlur,
    readOnly = false,
    autocomplete = false,
    suggestions,
    autocompleteChars,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const interceptFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!readOnly) {
      setIsFocused(true);
    }
    if (handleFocus) handleFocus(e);
  };

  const interceptBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (handleBlur) handleBlur(e);
  };

  const transformedIsDisabled =
    typeof isDisabled === "boolean" ? isDisabled : false;

  const transformedTypes = inputTypes.includes(type) ? type : "text";

  const transformedIsRequired =
    typeof isRequired === "boolean" ? isRequired : false;

  const transformedState =
    transformedIsRequired && inputStates.includes(state) ? state : "pending";

  const transformedIsFullWidth =
    typeof isFullWidth === "boolean" ? isFullWidth : false;

  return (
    <TextFieldUI
      label={label}
      name={name}
      id={id}
      placeholder={placeholder}
      isDisabled={transformedIsDisabled}
      type={transformedTypes}
      value={value}
      handleChange={handleChange}
      iconBefore={iconBefore}
      iconAfter={iconAfter}
      maxLength={maxLength}
      minLength={minLength}
      max={max}
      min={min}
      isRequired={transformedIsRequired}
      size={size}
      state={transformedState}
      errorMessage={errorMessage}
      validMessage={validMessage}
      isFullWidth={transformedIsFullWidth}
      isFocused={isFocused}
      handleFocus={interceptFocus}
      handleBlur={interceptBlur}
      readOnly={readOnly}
      autocomplete={autocomplete}
      suggestions={suggestions}
      autocompleteChars={autocompleteChars}
    />
  );
}

export { TextField };
export type { TextFieldProps };
