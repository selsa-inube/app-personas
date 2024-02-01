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
  isTouched?: boolean;
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
  const [isTouched, setIsTouched] = useState(false);
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      open &&
      selectRef.current &&
      target &&
      !selectRef.current.contains(target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectRef, open]);

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!readOnly) {
      setIsFocused(true);
      setIsTouched(true);
      setOpen(true);
    }
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setIsFocused(false);

    if (onBlur) onBlur(e);
  };

  const handleToggleOptions = () => {
    setOpen(false);
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
    handleToggleOptions();
  };

  const transformedState =
    (isFocused || isTouched) && inputStates.includes(state) ? state : "pending";

  if (!isDisabled && !options) {
    console.warn(
      'The "options" prop is required if the select is not disabled.',
    );
  }

  return (
    <SelectUI
      label={label}
      name={name}
      id={id}
      placeholder={placeholder}
      isDisabled={isDisabled}
      value={value}
      isRequired={isRequired}
      size={size}
      state={transformedState}
      errorMessage={errorMessage}
      isFullWidth={isFullWidth}
      isFocused={isFocused}
      options={options}
      openOptions={open}
      selectRef={selectRef}
      readOnly={readOnly}
      isTouched={isTouched}
      onClick={onClick}
      onChange={onChange}
      onOptionClick={handleOptionClick}
      onToggleOptions={handleToggleOptions}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}

export { Select };
export type { SelectProps };
