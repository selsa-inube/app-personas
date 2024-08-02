import { Text } from "@design/data/Text";
import { MdCheckCircle, MdOutlineWarning } from "react-icons/md";
import { Label } from "../Label";
import { ITextFieldMessage } from "./types";

import { inube } from "@design/tokens";
import { TextFieldProps } from ".";
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
import { Stack } from "@inubekit/stack";

function Invalid(props: ITextFieldMessage) {
  const { isDisabled, state, errorMessage } = props;

  return (
    <StyledErrorMessageContainer $isDisabled={isDisabled} $state={state}>
      <MdOutlineWarning />
      <Text type="body" size="small" appearance="danger" disabled={isDisabled}>
        {errorMessage}
      </Text>
    </StyledErrorMessageContainer>
  );
}

function Success(props: ITextFieldMessage) {
  const { isDisabled, state, validMessage } = props;

  return (
    <StyledValidMessageContainer $isDisabled={isDisabled} $state={state}>
      <MdCheckCircle />
      <Text type="body" size="small" appearance="success" disabled={isDisabled}>
        {validMessage}
      </Text>
    </StyledValidMessageContainer>
  );
}

interface TextFieldUIProps extends TextFieldProps {
  showDropdown?: boolean;
  initialValue?: string | number;
  onSuggestionSelect: (selectedValue: string) => void;
}

function TextFieldUI(props: TextFieldUIProps) {
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
    suggestions,
    lengthThreshold = 0,
    withCounter,
    isTouched,
    showDropdown,
    initialValue,
    onChange,
    onFocus,
    onBlur,
    onIconClick,
    onSuggestionSelect,
  } = props;

  const truncatedValue = String(value).slice(0, maxLength);

  const counterAppearence: CounterAppearence =
    maxLength &&
    maxLength - truncatedValue.length <= lengthThreshold &&
    truncatedValue.length < maxLength
      ? "warning"
      : truncatedValue.length === maxLength
        ? "danger"
        : "gray";

  return (
    <StyledContainer $isFullWidth={isFullWidth} $isDisabled={isDisabled}>
      <Stack direction="column" gap={inube.spacing.s050}>
        {(label || isRequired || (!isDisabled && maxLength && withCounter)) && (
          <Stack justifyContent="space-between" alignItems="center">
            {(label || isRequired) && (
              <Stack
                width="100%"
                gap={inube.spacing.s050}
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
        )}

        <StyledInputContainer
          $isDisabled={isDisabled}
          $isFocused={isFocused}
          $state={state}
          $iconBefore={iconBefore}
          $iconAfter={iconAfter}
          $readOnly={readOnly}
        >
          {iconBefore && (
            <StyledIcon
              $isDisabled={isDisabled}
              $iconBefore={iconBefore}
              onClick={onIconClick}
            >
              {iconBefore}
            </StyledIcon>
          )}

          <StyledInput
            $label={label}
            name={name}
            id={id}
            placeholder={isDisabled ? undefined : placeholder}
            $isDisabled={isDisabled}
            $isFullWidth={isFullWidth}
            type={type}
            value={value}
            maxLength={maxLength}
            minLength={minLength}
            max={max}
            min={min}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={readOnly}
            $size={size}
          />
          {iconAfter && (
            <StyledIcon
              $iconAfter={iconAfter}
              $isDisabled={isDisabled}
              $readOnly={readOnly}
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
            onClick={onSuggestionSelect}
          />
        )}

      {state === "invalid" && isTouched && errorMessage && (
        <Invalid
          isDisabled={isDisabled}
          state={state}
          errorMessage={errorMessage}
        />
      )}
      {state === "valid" &&
        value &&
        value.toString().length > 0 &&
        value !== initialValue &&
        isTouched && (
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
