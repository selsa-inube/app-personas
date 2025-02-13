import { useState } from "react";
import { DropdownItemProps } from "../DropdownItem";
import { TextFieldUI } from "./interface";
import { InputSize, InputState, InputType, inputStates } from "./types";

interface TextFieldProps {
  label?: string;
  name: string;
  id: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string | number;
  iconBefore?: React.JSX.Element;
  iconAfter?: React.JSX.Element;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  required?: boolean;
  message?: string;
  validMessage?: string;
  fullwidth?: boolean;
  readonly?: boolean;
  isFocused?: boolean;
  isTouched?: boolean;
  type?: InputType;
  state?: InputState;
  size?: InputSize;
  autocomplete?: boolean;
  suggestions?: DropdownItemProps[];
  autocompleteChars?: number;
  lengthThreshold?: number;
  withCounter?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
}

function TextField(props: TextFieldProps) {
  const {
    label,
    name,
    id,
    placeholder = "",
    disabled = false,
    type = "text",
    state = "pending",
    size,
    value,
    iconBefore,
    iconAfter,
    maxLength,
    minLength,
    max,
    min,
    required = false,
    message,
    validMessage,
    fullwidth = false,
    readonly = false,
    autocomplete = false,
    suggestions,
    autocompleteChars,
    lengthThreshold,
    withCounter,
    onChange,
    onFocus,
    onBlur,
    onIconClick,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [initialValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (
      autocomplete && autocompleteChars
        ? newValue.length >= autocompleteChars
        : true
    ) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }

    if (!onIconClick) {
      onChange && onChange(event);
    }
  };

  const handleSuggestionSelect = (selectedValue: string) => {
    const event = {
      target: {
        name,
        value: selectedValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange && onChange(event);
    setShowDropdown(false);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!readonly) {
      setIsTouched(true);
      setIsFocused(true);
    }
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const transformedState =
    (isFocused || isTouched) && inputStates.includes(state) ? state : "pending";

  return (
    <TextFieldUI
      label={label}
      name={name}
      id={id}
      placeholder={placeholder}
      disabled={disabled || readonly}
      type={type}
      value={value}
      iconBefore={iconBefore}
      iconAfter={iconAfter}
      maxLength={maxLength}
      minLength={minLength}
      max={max}
      min={min}
      required={required}
      size={size}
      state={transformedState}
      message={message}
      validMessage={validMessage}
      fullwidth={fullwidth}
      isFocused={isFocused}
      isTouched={isTouched}
      autocomplete={autocomplete}
      suggestions={suggestions}
      autocompleteChars={autocompleteChars}
      withCounter={withCounter}
      lengthThreshold={lengthThreshold}
      showDropdown={showDropdown}
      initialValue={initialValue}
      onSuggestionSelect={handleSuggestionSelect}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onIconClick={onIconClick}
    />
  );
}

export { TextField };
export type { TextFieldProps };
