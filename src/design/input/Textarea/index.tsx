import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Label, Stack, Text } from "@inubekit/inubekit";
import { useState } from "react";
import { MdCheckCircle, MdOutlineWarning } from "react-icons/md";
import {
  StyledErrorMessageContainer,
  StyledValidMessageContainer,
} from "../TextField/styles";
import { ITextFieldMessage, InputState, inputStates } from "../TextField/types";
import { Counter } from "./Counter";
import { StyledContainer, StyledTextarea } from "./styles";
import { CounterAppearence } from "./types";

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

interface TextareaProps {
  label?: string;
  name: string;
  id: string;
  placeholder?: string;
  disabled?: boolean;
  isFocused?: boolean;
  value?: string;
  maxLength?: number;
  required?: boolean;
  fullwidth?: boolean;
  readonly?: boolean;
  lengthThreshold?: number;
  state?: InputState;
  message?: string;
  validMessage?: string;
  withCounter?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const Textarea = (props: TextareaProps) => {
  const {
    label,
    name,
    id,
    placeholder,
    disabled,
    value = "",
    maxLength = Infinity,
    required,
    fullwidth,
    readonly,
    lengthThreshold = 0,
    state = "pending",
    message,
    validMessage,
    withCounter,
    onChange,
    onFocus,
    onBlur,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const truncatedValue = value.slice(0, maxLength);

  const isMobile = useMediaQuery("(max-width: 560px)");

  const counterAppearence: CounterAppearence =
    maxLength - truncatedValue.length <= lengthThreshold &&
    truncatedValue.length < maxLength
      ? "warning"
      : truncatedValue.length === maxLength
        ? "danger"
        : "gray";

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!readonly) {
      setIsTouched(true);
      setIsFocused(true);
    }
    onFocus && onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const transformedState =
    (isFocused || isTouched) && inputStates.includes(state) ? state : "pending";

  return (
    <StyledContainer $isFullwidth={fullwidth} $disabled={disabled}>
      <Stack width="100%" margin={`0px 0px ${inube.spacing.s050} 0px`}>
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
                focused={isFocused}
                size={isMobile ? "medium" : "large"}
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
        {!disabled && withCounter && (
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

      <StyledTextarea
        name={name}
        id={id}
        placeholder={placeholder}
        $disabled={disabled}
        $required={required}
        $isFullwidth={fullwidth}
        $isFocused={isFocused}
        readOnly={readonly}
        value={truncatedValue}
        $isMobile={isMobile}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {transformedState === "invalid" && isTouched && (
        <Invalid
          disabled={disabled}
          state={transformedState}
          message={message}
        />
      )}
      {transformedState === "valid" && isTouched && validMessage && (
        <Success
          disabled={disabled}
          state={transformedState}
          validMessage={validMessage}
        />
      )}
    </StyledContainer>
  );
};

export { Textarea };
export type { TextareaProps };
