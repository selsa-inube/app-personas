import { useEffect, useRef, useState } from "react";
import { SelectUI } from "./interface";
import { ISelectOption, InputSize, InputState, inputStates } from "./types";

interface SelectProps {
  label?: string;
  name?: string;
  id: string;
  placeholder?: string;
  isDisabled?: boolean;
  value?: string;
  isRequired?: boolean;
  state?: InputState;
  errorMessage?: string;
  size?: InputSize;
  isFullWidth?: boolean;
  readOnly?: boolean;
  options?: ISelectOption[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onClick?: (event: React.MouseEvent) => void;
}

function Select(props: SelectProps) {
  const {
    label,
    name,
    id,
    placeholder = "Seleccione una opción",
    isDisabled = false,
    value,
    isRequired = false,
    state = "pending",
    errorMessage,
    size = "wide",
    isFullWidth = false,
    onFocus,
    onChange,
    onBlur,
    onClick,
    options,
    readOnly,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const interceptFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!readOnly) {
      setIsFocused(true);
    }
    if (onFocus) onFocus(e);
  };

  const interceptBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setIsFocused(false);

    if (onBlur) onBlur(e);
  };

  const handleCloseOptions = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node | null;
    if (selectRef.current && target && !selectRef.current.contains(target)) {
      setOpen(false);
    }
    if (onBlur) {
      const event = {
        target: selectRef.current,
      } as React.FocusEvent<HTMLDivElement>;

      onBlur(event);
    }
  };

  const handleOptionClick = (id: string) => {
    if (!options) return;

    const optionFound = options.find((option) => option.id === id);
    if (!optionFound) return;

    const event = {
      target: {
        name,
        value: optionFound.id,
      },
    } as React.ChangeEvent<HTMLSelectElement>;

    if (onChange) onChange(event);

    setIsFocused(false);
    handleCloseOptions();
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectRef]);

  const transformedIsDisabled =
    typeof isDisabled === "boolean" ? isDisabled : false;

  const transformedState = inputStates.includes(state) ? state : "pending";

  const transformedIsRequired =
    typeof isRequired === "boolean" ? isRequired : false;

  const transformedIsFullWidth =
    typeof isFullWidth === "boolean" ? isFullWidth : false;

  if (!isDisabled && !options) {
    console.warn(
      'The "options" prop is required if the select is not disabled.'
    );
  }

  return (
    <SelectUI
      label={label}
      name={name}
      id={id}
      placeholder={placeholder}
      isDisabled={transformedIsDisabled}
      value={value}
      onChange={onChange}
      isRequired={transformedIsRequired}
      size={size}
      state={transformedState}
      errorMessage={errorMessage}
      isFullWidth={transformedIsFullWidth}
      isFocused={isFocused}
      onFocus={interceptFocus}
      onBlur={interceptBlur}
      options={options}
      openOptions={open}
      onClick={onClick}
      onCloseOptions={handleCloseOptions}
      selectRef={selectRef}
      onOptionClick={handleOptionClick}
      readOnly={readOnly}
    />
  );
}

export { Select };
export type { SelectProps };
