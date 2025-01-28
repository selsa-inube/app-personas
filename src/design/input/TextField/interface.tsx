import { MdCheckCircle, MdOutlineWarning } from "react-icons/md";
import { ITextFieldMessage } from "./types";

import { inube } from "@design/tokens";
import { Label, Stack, Text } from "@inubekit/inubekit";
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

function Invalid(props: ITextFieldMessage) {
  const { disabled, state, message } = props;

  return (
    <StyledErrorMessageContainer $disabled={disabled} $state={state}>
      <MdOutlineWarning />
      <Text type="body" size="small" appearance="danger" disabled={disabled}>
        {message}
      </Text>
    </StyledErrorMessageContainer>
  );
}

function Success(props: ITextFieldMessage) {
  const { disabled, state, validMessage } = props;

  return (
    <StyledValidMessageContainer $disabled={disabled} $state={state}>
      <MdCheckCircle />
      <Text type="body" size="small" appearance="success" disabled={disabled}>
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
    disabled = false,
    type,
    value,
    iconBefore,
    iconAfter,
    maxLength,
    minLength,
    max,
    min,
    required,
    state = "pending",
    message,
    validMessage,
    size = "compact",
    fullwidth = false,
    isFocused = false,
    readonly,
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
    <StyledContainer $fullwidth={fullwidth} $disabled={disabled}>
      <Stack direction="column" gap={inube.spacing.s050}>
        {(label || required || (!disabled && maxLength && withCounter)) && (
          <Stack justifyContent="space-between" alignItems="center">
            {(label || required) && (
              <Stack
                width="100%"
                gap={inube.spacing.s050}
                alignItems="center"
                padding={`0px 0px 0px ${inube.spacing.s200}`}
              >
                {label && (
                  <Label
                    htmlFor={id}
                    disabled={disabled}
                    focused={isFocused && state !== "invalid"}
                    invalid={state === "invalid"}
                    size="medium"
                  >
                    {label}
                  </Label>
                )}

                {required && !disabled && (
                  <Text type="body" size="small" appearance="dark">
                    (Requerido)
                  </Text>
                )}
              </Stack>
            )}

            {!disabled && maxLength && withCounter && (
              <Stack justifyContent="flex-end" alignItems="center">
                <Counter
                  appearance={counterAppearence}
                  maxLength={maxLength}
                  disabled={disabled}
                  valueLength={truncatedValue.length}
                />
              </Stack>
            )}
          </Stack>
        )}

        <StyledInputContainer
          $disabled={disabled}
          $isFocused={isFocused}
          $state={state}
          $iconBefore={iconBefore}
          $iconAfter={iconAfter}
          $readonly={readonly}
        >
          {iconBefore && (
            <StyledIcon
              $disabled={disabled}
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
            placeholder={disabled ? undefined : placeholder}
            $disabled={disabled}
            $fullwidth={fullwidth}
            type={type}
            value={value}
            maxLength={maxLength}
            minLength={minLength}
            max={max}
            min={min}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={readonly}
            $size={size}
          />
          {iconAfter && (
            <StyledIcon
              $iconAfter={iconAfter}
              $disabled={disabled}
              $readonly={readonly}
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

      {state === "invalid" && isTouched && message && (
        <Invalid disabled={disabled} state={state} message={message} />
      )}
      {state === "valid" &&
        value &&
        value.toString().length > 0 &&
        value !== initialValue &&
        validMessage &&
        isTouched && (
          <Success
            disabled={disabled}
            state={state}
            validMessage={validMessage}
          />
        )}
    </StyledContainer>
  );
}

export { TextFieldUI };
