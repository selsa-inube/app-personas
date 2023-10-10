import { Text } from "@design/data/Text";
import { MdCheckCircle, MdOutlineError } from "react-icons/md";
import { TextFieldProps } from ".";
import { Label } from "../Label";
import { ITextFieldMessage } from "./types";

import {
  StyledContainer,
  StyledContainerLabel,
  StyledErrorMessageContainer,
  StyledIcon,
  StyledInput,
  StyledInputContainer,
  StyledValidMessageContainer,
} from "./styles";
import { useState } from "react";
import { DropdownMenu } from "../DropdownMenu";

function Invalid(props: ITextFieldMessage) {
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

function Success(props: ITextFieldMessage) {
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

function TextFieldUI(props: TextFieldProps) {
  const {
    label = "",
    name,
    id,
    placeholder,
    isDisabled = false,
    type,
    value,
    handleChange,
    iconBefore,
    iconAfter,
    maxLength,
    minLength,
    max,
    min,
    isRequired,
    state = "pending",
    errorMessage,
    validMessage,
    size = "compact",
    isFullWidth = false,
    isFocused = false,
    handleFocus,
    handleBlur,
    readOnly,
    autocomplete,
    suggestions,
    autocompleteChars,
  } = props;

  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (autocompleteChars ? value.length >= autocompleteChars : true) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }

    setInputValue(value);

    if (handleChange) {
      handleChange(event);
    }
  };

  const handleSuggestionSelect = (selectedValue: string) => {
    setInputValue(selectedValue);
    setShowDropdown(false);
  };

  return (
    <StyledContainer isFullWidth={isFullWidth} isDisabled={isDisabled}>
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
            isInvalid={state === "invalid"}
          >
            {label}
          </Label>
        )}

        {isRequired && !isDisabled && (
          <Text type="body" size="small" appearance="dark">
            (Requerido)
          </Text>
        )}
      </StyledContainerLabel>

      <StyledInputContainer
        isDisabled={isDisabled}
        isFocused={isFocused}
        state={state}
        iconBefore={iconBefore}
        iconAfter={iconAfter}
        readOnly={readOnly}
      >
        {iconBefore && (
          <StyledIcon isDisabled={isDisabled} iconBefore={iconBefore}>
            {iconBefore}
          </StyledIcon>
        )}

        <StyledInput
          label={label}
          name={name}
          id={id}
          placeholder={placeholder}
          isDisabled={isDisabled}
          isFullWidth={isFullWidth}
          type={type}
          value={inputValue}
          maxLength={maxLength}
          minLength={minLength}
          max={max}
          min={min}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          readOnly={readOnly}
          $size={size}
        />
        {iconAfter && (
          <StyledIcon iconAfter={iconAfter} isDisabled={isDisabled}>
            {iconAfter}
          </StyledIcon>
        )}
      </StyledInputContainer>
      {showDropdown &&
        suggestions &&
        suggestions.length > 0 &&
        suggestions.some((suggestion) =>
          suggestion.value
            .toLowerCase()
            .includes(String(inputValue).toLowerCase())
        ) && (
          <DropdownMenu
            options={suggestions
              .filter((suggestion) =>
                suggestion.value
                  .toLowerCase()
                  .includes(String(inputValue).toLowerCase())
              )
              .flat()}
            handleClick={handleSuggestionSelect}
          />
        )}

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
    </StyledContainer>
  );
}

export { TextFieldUI };
