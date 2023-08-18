import { RefObject } from "react";
import { MdCheckCircle, MdExpandMore, MdOutlineError } from "react-icons/md";

import { SelectProps } from ".";
import { Text } from "../../data/Text";
import { DropdownMenu } from "../DropdownMenu";
import { Label } from "../Label";
import { ISelectMessage, ISelectOption } from "./types";

import {
  StyledContainer,
  StyledContainerLabel,
  StyledErrorMessageContainer,
  StyledIcon,
  StyledInput,
  StyledInputContainer,
  StyledValidMessageContainer,
} from "./styles";

function Invalid(props: ISelectMessage) {
  const { isDisabled, state, errorMessage } = props;
  const transformedErrorMessage = errorMessage && `(${errorMessage})`;

  return (
    <StyledErrorMessageContainer isDisabled={isDisabled} state={state}>
      <MdOutlineError />
      <Text type="body" size="small" appearance="error" disabled={isDisabled}>
        {transformedErrorMessage}
      </Text>
    </StyledErrorMessageContainer>
  );
}

function Success(props: ISelectMessage) {
  const { isDisabled, state, validMessage } = props;

  return (
    <StyledValidMessageContainer isDisabled={isDisabled} state={state}>
      <MdCheckCircle />
      <Text type="body" size="small" appearance="success" disabled={isDisabled}>
        {validMessage}
      </Text>
    </StyledValidMessageContainer>
  );
}

interface SelectUIProps extends SelectProps {
  currentOption: ISelectOption;
  isFocused?: boolean;
  openOptions: boolean;
  selectRef?: RefObject<HTMLDivElement> | null;
  onCloseOptions: () => void;
}

function SelectUI(props: SelectUIProps) {
  const {
    label,
    name,
    id,
    placeholder,
    isDisabled = false,
    isFullWidth = false,
    isFocused = false,
    isRequired,
    state = "pending",
    inputSize = "compact",
    errorMessage,
    validMessage,
    handleChange,
    handleFocus,
    handleBlur,
    options,
    openOptions,
    currentOption,
    handleClick,
    onCloseOptions,
    selectRef,
  } = props;

  const handleOptionClick = (id: string) => {
    const option = options.find((option) => option.id === id);
    if (!option) return;

    if (handleChange) handleChange(option);

    onCloseOptions();
  };

  const interceptorOnClick = (e: React.MouseEvent) => {
    if (handleClick) handleClick(e);

    onCloseOptions();
  };

  const transformedIsInvalid = state === "invalid" ? true : false;

  return (
    <StyledContainer
      isFullWidth={isFullWidth}
      isDisabled={isDisabled}
      ref={selectRef}
    >
      <StyledContainerLabel alignItems="center" isDisabled={isDisabled}>
        {label && (
          <Label
            htmlFor={id}
            isDisabled={isDisabled}
            isFocused={isFocused}
            isInvalid={transformedIsInvalid}
          >
            {label}
          </Label>
        )}

        {isRequired && !isDisabled && (
          <Text type="body" size="small" appearance="dark">
            (Required)
          </Text>
        )}
      </StyledContainerLabel>

      <StyledInputContainer
        isDisabled={isDisabled}
        isFocused={isFocused}
        state={state}
        inputSize={inputSize}
      >
        <StyledInput
          autoComplete="off"
          readOnly
          value={currentOption.value}
          name={name}
          id={id}
          placeholder={placeholder}
          isDisabled={isDisabled}
          required={isRequired}
          state={state}
          isFullWidth={isFullWidth}
          isFocused={isFocused}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={(e: React.MouseEvent) => interceptorOnClick(e)}
        />

        <StyledIcon isDisabled={isDisabled}>
          <MdExpandMore onClick={onCloseOptions} />
        </StyledIcon>
      </StyledInputContainer>

      {state === "invalid" && (
        <Invalid
          isDisabled={isDisabled}
          state={state}
          errorMessage={errorMessage}
        />
      )}
      {state === "valid" && (
        <Success
          isDisabled={isDisabled}
          state={state}
          validMessage={validMessage}
        />
      )}
      {openOptions && !isDisabled && (
        <DropdownMenu
          options={options}
          handleClick={handleOptionClick}
          onCloseOptions={onCloseOptions}
        />
      )}
    </StyledContainer>
  );
}

export { SelectUI };
export type { SelectUIProps };
