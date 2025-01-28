import { inube } from "@design/tokens";
import { MdCheckCircle, MdOutlineWarning } from "react-icons/md";
import { IDateFieldMessage } from "../DateField/types";
import {
  StyledContainer,
  StyledErrorMessageContainer,
  StyledInput,
  StyledInputContainer,
  StyledValidMessageContainer,
} from "./styles";

import { Label, Stack, Text } from "@inubekit/inubekit";
import { DateFieldProps } from ".";

function Invalid(props: IDateFieldMessage) {
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

function Success(props: IDateFieldMessage) {
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

interface DateFieldUIProps extends DateFieldProps {
  initialValue?: string;
}

function DateFieldUI(props: DateFieldUIProps) {
  const {
    label,
    name,
    id,
    disabled = false,
    max,
    min,
    step,
    value,
    readonly,
    required,
    message,
    validMessage,
    fullwidth = false,
    state = "pending",
    size = "compact",
    initialValue,
    isFocused,
    isTouched,
    onChange,
    onFocus,
    onBlur,
  } = props;

  const normalizedValue = value && new Date(value).toISOString().split("T")[0];

  return (
    <StyledContainer
      $fullwidth={fullwidth}
      $disabled={disabled}
      $readonly={readonly}
      $size={size}
    >
      <Stack direction="column" gap={inube.spacing.s050}>
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
        </Stack>
        <StyledInputContainer
          $disabled={disabled}
          $isFocused={isFocused}
          $state={state}
          $readonly={readonly}
        >
          <StyledInput
            id={id}
            name={name}
            type="date"
            min={min}
            max={max}
            step={step}
            $disabled={disabled}
            value={normalizedValue || ""}
            required={required}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            $fullwidth={fullwidth}
            readOnly={readonly}
            $size={size}
          />
        </StyledInputContainer>
      </Stack>

      {state === "invalid" && isTouched && (
        <Invalid disabled={disabled} state={state} message={message} />
      )}
      {state === "valid" &&
        validMessage &&
        value &&
        value.toString().length > 0 &&
        value !== initialValue &&
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

export { DateFieldUI };
