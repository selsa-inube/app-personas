import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { useState } from "react";
import { MdCheckCircle, MdOutlineWarning } from "react-icons/md";
import { Label } from "../Label";
import { ITextFieldMessage } from "../TextField/types";
import {
  StyledContainer,
  StyledErrorMessageContainer,
  StyledInputContainer,
  StyledValidMessageContainer,
} from "./styles";
import { InputSize, InputState } from "./types";

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

interface DateFieldProps {
  id: string;
  name: string;
  label?: string;
  isDisabled?: boolean;
  max?: string;
  min?: string;
  step?: string;
  value?: string;
  readOnly?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  validMessage?: string;
  isFullWidth?: boolean;
  isFocused?: boolean;
  isTouched?: boolean;
  state?: InputState;
  size?: InputSize;
  initialValue?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

function DateField(props: DateFieldProps) {
  const {
    label,
    name,
    id,
    isDisabled = false,
    max,
    min,
    step,
    value,
    readOnly,
    isRequired,
    errorMessage,
    validMessage,
    isFullWidth = false,
    state = "pending",
    size = "compact",
    initialValue,
    onChange,
    onFocus,
    onBlur,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (!readOnly) {
      setIsTouched(true);
      setIsFocused(true);
    }
    onFocus && onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <StyledContainer
      isFullWidth={isFullWidth}
      isDisabled={isDisabled}
      readOnly={readOnly}
      $size={size}
    >
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
        </Stack>
        <StyledInputContainer
          isDisabled={isDisabled}
          isFocused={isFocused}
          state={state}
          readOnly={readOnly}
          isFullWidth={isFullWidth}
          $size={size}
        >
          <input
            id={id}
            name={name}
            type="date"
            min={min}
            max={max}
            step={step}
            disabled={readOnly}
            value={value}
            required={isRequired}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={onChange}
            pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
          />
        </StyledInputContainer>
      </Stack>

      {state === "invalid" && isTouched && (
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

export { DateField };
