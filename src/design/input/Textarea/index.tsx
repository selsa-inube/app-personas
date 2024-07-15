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
import { ITextFieldMessage, InputState, inputStates } from "../TextField/types";
import { Counter } from "./Counter";
import { StyledContainer, StyledTextarea } from "./styles";
import { CounterAppearence } from "./types";

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

interface TextareaProps {
  label?: string;
  name: string;
  id: string;
  placeholder?: string;
  isDisabled?: boolean;
  isFocused?: boolean;
  value?: string;
  maxLength?: number;
  isRequired?: boolean;
  isFullWidth?: boolean;
  readOnly?: boolean;
  lengthThreshold?: number;
  state?: InputState;
  errorMessage?: string;
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
    isDisabled,
    value = "",
    maxLength = Infinity,
    isRequired,
    isFullWidth,
    readOnly,
    lengthThreshold = 0,
    state = "pending",
    errorMessage,
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
    if (!readOnly) {
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
    <StyledContainer $isFullwidth={isFullWidth} $isDisabled={isDisabled}>
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
        {!isDisabled && withCounter && (
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

      <StyledTextarea
        name={name}
        id={id}
        placeholder={placeholder}
        $isDisabled={isDisabled}
        $isRequired={isRequired}
        $isFullwidth={isFullWidth}
        $isFocused={isFocused}
        readOnly={readOnly}
        value={truncatedValue}
        $isMobile={isMobile}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {transformedState === "invalid" && isTouched && (
        <Invalid
          isDisabled={isDisabled}
          state={transformedState}
          errorMessage={errorMessage}
        />
      )}
      {transformedState === "valid" && isTouched && validMessage && (
        <Success
          isDisabled={isDisabled}
          state={transformedState}
          validMessage={validMessage}
        />
      )}
    </StyledContainer>
  );
};

export { Textarea };
export type { TextareaProps };
