import { useState, useRef } from "react";
import { MdOutlineError, MdCheckCircle, MdExpandMore } from "react-icons/md";

import { Label } from "../Label";
import { Text } from "../../data/Text";
import { DropdownMenu } from "../DropdownMenu";
import { IMessage } from "../TextField/types";
import { ISelectInterface } from "./types";

import {
  StyledContainer,
  StyledContainerLabel,
  StyledInputContainer,
  StyledInput,
  StyledIcon,
  StyledErrorMessageContainer,
  StyledValidMessageContainer,
} from "./styles";

function Invalid(props: IMessage) {
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

function Success(props: IMessage) {
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

function SelectUI(props: ISelectInterface) {
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
    value,
    handleClick,
    onCloseOptions,
  } = props;

  const [selectedOption, setSelectedOption] = useState(value);

  const handleOptionClick = (id: string) => {
    const option = options.find((option) => option.id === id);
    setSelectedOption(option?.label);
  };

  const interceptorOnClick = (e: React.MouseEvent) => {
    if (typeof handleClick === "function") {
      handleClick(e);
    }
    if (typeof onCloseOptions === "function") {
      onCloseOptions();
    }
  };

  const transformedIsInvalid = state === "invalid" ? true : false;

  const myRef = useRef<HTMLDivElement | null>(null);

  return (
    <StyledContainer
      isFullWidth={isFullWidth}
      isDisabled={isDisabled}
      ref={myRef}
    >
      <StyledContainerLabel
        alignItems="center"
        wrap="wrap"
        isDisabled={isDisabled}
      >
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
      >
        <StyledInput
          autoComplete="off"
          readOnly={false}
          defaultValue={selectedOption || value}
          name={name}
          id={id}
          placeholder={placeholder}
          isDisabled={isDisabled}
          required={isRequired}
          inputSize={inputSize}
          isFullWidth={isFullWidth}
          isFocused={isFocused}
          onChange={handleChange}
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
          handleSelect={handleOptionClick}
        />
      )}
    </StyledContainer>
  );
}

export { SelectUI };
