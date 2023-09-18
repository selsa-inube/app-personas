import { useEffect, useRef, useState } from "react";
import { SelectUI } from "./interface";
import { ISelectOption, InputSize, InputState, inputStates } from "./types";

interface SelectProps {
  label?: string;
  name?: string;
  id: string;
  placeholder?: string;
  isDisabled?: boolean;
  value?: ISelectOption;
  isRequired?: boolean;
  state?: InputState;
  errorMessage?: string;
  validMessage?: string;
  size?: InputSize;
  isFullWidth?: boolean;
  readOnly?: boolean;
  options?: ISelectOption[];
  handleChange?: (option: ISelectOption) => void;
  handleFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick?: (event: React.MouseEvent) => void;
}

function Select(props: SelectProps) {
  const {
    label,
    name,
    id,
    placeholder,
    isDisabled = false,
    value = {
      id: "",
      value: "Seleccione una opción",
    },
    handleChange,
    isRequired = false,
    state = "pending",
    errorMessage,
    validMessage,
    size = "wide",
    isFullWidth = false,
    handleFocus,
    handleBlur,
    options,
    handleClick,
    readOnly,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const interceptFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!readOnly) {
      setIsFocused(true);
    }
    if (handleFocus) handleFocus(e);
  };

  const interceptBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(false);

    if (handleBlur) handleBlur(e);
  };

  const handleCloseOptions = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node | null;
    if (selectRef.current && target && !selectRef.current.contains(target)) {
      setOpen(false);
    }
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
      currentOption={value}
      handleChange={handleChange}
      isRequired={transformedIsRequired}
      size={size}
      state={transformedState}
      errorMessage={errorMessage}
      validMessage={validMessage}
      isFullWidth={transformedIsFullWidth}
      isFocused={isFocused}
      handleFocus={interceptFocus}
      handleBlur={interceptBlur}
      options={options}
      openOptions={open}
      handleClick={handleClick}
      onCloseOptions={handleCloseOptions}
      selectRef={selectRef}
    />
  );
}

export { Select };
export type { SelectProps };
