import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useState } from "react";
import { MdCheckCircle, MdOutlineWarning } from "react-icons/md";
import { Label } from "../Label";
import {
  StyledErrorMessageContainer,
  StyledValidMessageContainer,
} from "../TextField/styles";
import { ITextFieldMessage, InputState } from "../TextField/types";
import { Counter } from "./Counter";
import { StyledContainer, StyledTextarea } from "./styles";
import { CounterAppearence } from "./types";

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

interface TextareaProps {
  label?: string;
  name: string;
  id: string;
  placeholder?: string;
  isDisabled?: boolean;
  isFocused?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  isRequired?: boolean;
  isFullWidth?: boolean;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  lengthThreshold?: number;
  state?: InputState;
  errorMessage?: string;
  validMessage?: string;
}

const Textarea = (props: TextareaProps) => {
  const {
    label,
    name,
    id,
    placeholder,
    isDisabled,
    value = "",
    maxLength = Infinity,
    isRequired,
    isFullWidth,
    onChange,
    onFocus,
    onBlur,
    readOnly,
    lengthThreshold = 0,
    state = "pending",
    errorMessage,
    validMessage,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const truncatedValue = value.slice(0, maxLength);

  const isMobile = useMediaQuery("(max-width: 560px)");

  let appearance: CounterAppearence =
    maxLength - truncatedValue.length <= lengthThreshold &&
    truncatedValue.length < maxLength
      ? "warning"
      : truncatedValue.length === maxLength
      ? "error"
      : "gray";

  const interceptFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!readOnly) {
      setIsFocused(true);
    }
    onFocus && onFocus(e);
  };

  const interceptBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <StyledContainer isFullwidth={isFullWidth} isDisabled={isDisabled}>
      <Stack width="100%" margin={`0px 0px ${inube.spacing.s050} 0px`}>
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
                isFocused={isFocused}
                size={isMobile ? "medium" : "large"}
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
        {!isDisabled && (
          <Stack justifyContent="flex-end" alignItems="center">
            <Counter
              appearance={appearance}
              maxLength={maxLength}
              isDisabled={isDisabled}
              valueLength={truncatedValue!.length}
            />
          </Stack>
        )}
      </Stack>

      <StyledTextarea
        name={name}
        id={id}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isFullwidth={isFullWidth}
        isFocused={isFocused}
        readOnly={readOnly}
        value={truncatedValue}
        isMobile={isMobile}
        onChange={onChange}
        onFocus={interceptFocus}
        onBlur={interceptBlur}
      />

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
};

export { Textarea };
export type { TextareaProps };
