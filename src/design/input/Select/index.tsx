import { useState, useRef, useEffect } from "react";
import { SelectUI } from "./interface";
import { InputSize, InputState, inputStates, ISelectOption } from "./types";

interface SelectProps {
  label?: string;
  name?: string;
  id: string;
  placeholder?: string;
  isDisabled?: boolean;
  value?: string | number;
  isRequired?: boolean;
  state?: InputState;
  errorMessage?: string;
  validMessage?: string;
  inputSize?: InputSize;
  isFullWidth?: boolean;
  readOnly?: boolean;
  options: ISelectOption[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
    value = "",
    handleChange,
    isRequired = false,
    state = "pending",
    errorMessage,
    validMessage,
    inputSize = "wide",
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
    if (typeof handleFocus === "function") {
      handleFocus(e);
    }
  };

  const interceptBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (typeof handleBlur === "function") {
      handleBlur(e);
    }
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

  return (
    <SelectUI
      label={label}
      name={name}
      id={id}
      placeholder={placeholder}
      isDisabled={transformedIsDisabled}
      value={value}
      handleChange={handleChange}
      isRequired={transformedIsRequired}
      inputSize={inputSize}
      state={transformedState}
      errorMessage={errorMessage}
      validMessage={validMessage}
      readOnly={readOnly}
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
