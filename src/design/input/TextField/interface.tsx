import { Text } from "@design/data/Text";
import { MdCheckCircle, MdOutlineWarning } from "react-icons/md";
import { TextFieldProps } from ".";
import { Label } from "../Label";
import { ITextFieldMessage } from "./types";

import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { useState } from "react";
import { DropdownMenu } from "../DropdownMenu";
import { Counter } from "../Textarea/Counter";
import { CounterAppearence } from "../Textarea/types";
import {
  StyledContainer,
  StyledErrorMessageContainer,
  StyledIcon,
  StyledInput,
  StyledInputContainer,
  StyledValidMessageContainer,
} from "./styles";

function Invalid(props: ITextFieldMessage) {
  const { isDisabled, state, errorMessage } = props;

  return (
    <StyledErrorMessageContainer isDisabled={isDisabled} state={state}>
      <MdOutlineWarning />
      <Text type="body" size="small" appearance="error" disabled={isDisabled}>
        {errorMessage}
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
    readOnly,
    autocomplete,
    suggestions,
    autocompleteChars,
    lengthThreshold = 0,
    withCounter,
    onChange,
    onFocus,
    onBlur,
    onIconClick,
  } = props;

  const [showDropdown, setShowDropdown] = useState(false);
  const [initialValue] = useState(value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  const truncatedValue = String(value).slice(0, maxLength);

  const counterAppearence: CounterAppearence =
    maxLength &&
    maxLength - truncatedValue.length <= lengthThreshold &&
    truncatedValue.length < maxLength
      ? "warning"
      : truncatedValue.length === maxLength
        ? "error"
        : "gray";

  return (
    <StyledContainer isFullWidth={isFullWidth} isDisabled={isDisabled}>
      <Stack direction="column" gap="s050">
        <Stack justifyContent="space-between" alignItems="center">
          {(label || isRequired) && (
            <Stack
              width="100%"
              gap="4px"
              alignItems="center"
              padding={`0px 0px 0px ${inube.spacing.s200}`}
            >
              {label && (
                <Label
                  htmlFor={id}
                  isDisabled={isDisabled}
                  isFocused={isFocused && state !== "invalid"}
                  isInvalid={state === "invalid"}
                  size="medium"
                >
                  {label}
                </Label>
              )}

              {isRequired && !isDisabled && (
                <Text type="body" size="small" appearance="dark">
                  (Requerido)
                </Text>
              )}
            </Stack>
          )}

          {!isDisabled && maxLength && withCounter && (
            <Stack justifyContent="flex-end" alignItems="center">
              <Counter
                appearance={counterAppearence}
                maxLength={maxLength}
                isDisabled={isDisabled}
                valueLength={truncatedValue.length}
              />
            </Stack>
          )}
        </Stack>

        <StyledInputContainer
          isDisabled={isDisabled}
          isFocused={isFocused}
          state={state}
          iconBefore={iconBefore}
          iconAfter={iconAfter}
          readOnly={readOnly}
        >
          {!isDisabled && iconBefore && (
            <StyledIcon
              isDisabled={isDisabled}
              iconBefore={iconBefore}
              onClick={onIconClick}
            >
              {iconBefore}
            </StyledIcon>
          )}

          <StyledInput
            label={label}
            name={name}
            id={id}
            placeholder={isDisabled ? undefined : placeholder}
            isDisabled={isDisabled}
            isFullWidth={isFullWidth}
            type={type}
            value={value}
            maxLength={maxLength}
            minLength={minLength}
            max={max}
            min={min}
            onChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={readOnly}
            $size={size}
          />
          {!isDisabled && iconAfter && (
            <StyledIcon
              iconAfter={iconAfter}
              isDisabled={isDisabled}
              onClick={onIconClick}
            >
              {iconAfter}
            </StyledIcon>
          )}
        </StyledInputContainer>
      </Stack>

      {showDropdown &&
        suggestions &&
        suggestions.length > 0 &&
        suggestions.some((suggestion) =>
          suggestion.value.toLowerCase().includes(String(value).toLowerCase()),
        ) && (
          <DropdownMenu
            options={suggestions
              .filter((suggestion) =>
                suggestion.value
                  .toLowerCase()
                  .includes(String(value).toLowerCase()),
              )
              .flat()}
            onClick={handleSuggestionSelect}
          />
        )}

      {state === "invalid" && (
        <Invalid
          isDisabled={isDisabled}
          state={state}
          errorMessage={errorMessage}
        />
      )}
      {state === "valid" &&
        value &&
        value.toString().length > 0 &&
        value !== initialValue && (
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
