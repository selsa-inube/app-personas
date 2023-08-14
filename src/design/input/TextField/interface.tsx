import { MdOutlineError, MdCheckCircle } from "react-icons/md";

import {
  StyledContainer,
  StyledContainerLabel,
  StyledInputContainer,
  StyledInput,
  StyledIcon,
  StyledErrorMessageContainer,
  StyledValidMessageContainer,
} from "./styles";
import { IInputMessage, InputSizeType } from "./types";
import { Text } from "@design/data/Text";
import { TextFieldProps } from ".";

const getTypo = (size: InputSizeType) => {
  if (size === "compact") {
    return "labelMedium";
  }
  return "labelLarge";
};

const Invalid = (props: IInputMessage) => {
  const { isDisabled, state, errorMessage } = props;
  const transformedErrorMessage = errorMessage && `(${errorMessage})`;

  return (
    <StyledErrorMessageContainer isDisabled={isDisabled} state={state}>
      <MdOutlineError />
      <Text
        type="body"
        size="small"
        margin="8px 0px 0px 4px"
        appearance="error"
        disabled={isDisabled}
      >
        {transformedErrorMessage}
      </Text>
    </StyledErrorMessageContainer>
  );
};

const Success = (props: IInputMessage) => {
  const { isDisabled, state, validMessage } = props;

  return (
    <StyledValidMessageContainer isDisabled={isDisabled} state={state}>
      <MdCheckCircle />
      <Text
        type="body"
        size="small"
        margin="8px 0px 0px 4px"
        appearance="success"
        disabled={isDisabled}
      >
        {validMessage}
      </Text>
    </StyledValidMessageContainer>
  );
};

const TextFieldUI = (props: TextFieldProps) => {
  const {
    label,
    name,
    id,
    placeholder,
    isDisabled,
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
    state,
    errorMessage,
    validMessage,
    size,
    isFullWidth,
    isFocused,
    handleFocus,
    handleBlur,
    readOnly,
  } = props;

  const transformedIsInvalid = state === "invalid" ? true : false;

  return (
    <StyledContainer isFullWidth={isFullWidth} isDisabled={isDisabled}>
      <StyledContainerLabel
        alignItems="center"
        wrap="wrap"
        size={size}
        isDisabled={isDisabled}
      >
        {label && (
          <Label
            htmlFor={id}
            isDisabled={isDisabled}
            isFocused={isFocused}
            isInvalid={transformedIsInvalid}
            typo={getTypo(size!)}
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
        iconBefore={iconBefore}
        iconAfter={iconAfter}
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
          type={type}
          value={value}
          iconBefore={iconBefore}
          iconAfter={iconAfter}
          maxLength={maxLength}
          minLength={minLength}
          max={max}
          min={min}
          isRequired={isRequired}
          size={size}
          state={state}
          isFullWidth={isFullWidth}
          isFocused={isFocused}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          readOnly={readOnly}
        />

        {iconAfter && (
          <StyledIcon iconAfter={iconAfter} isDisabled={isDisabled}>
            {iconAfter}
          </StyledIcon>
        )}
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
    </StyledContainer>
  );
};

export { TextFieldUI };
