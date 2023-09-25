import styled from "styled-components";
import { inube } from "../../tokens";
import { InputSize } from "./types";

interface IStyledContainer {
  isDisabled: boolean;
  isFullWidth: boolean;
}

const StyledContainer = styled.div<IStyledContainer>`
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  width: ${({ isFullWidth }) => (isFullWidth ? "100%" : "fit-content")};
  position: relative;
`;

interface IStyledContainerLabel {
  alignItems: string;
  isDisabled: boolean;
}

const StyledContainerLabel = styled.div<IStyledContainerLabel>`
  display: flex;
  align-items: center;
  margin-bottom: ${inube.spacing.s050};
  padding-left: ${inube.spacing.s200};
  pointer-events: ${({ isDisabled }) => isDisabled && "none"};

  & label {
    margin-right: ${inube.spacing.s050};
  }
`;

interface IStyledInputContainer {
  isDisabled: boolean;
  isFocused: boolean;
  state: string;
}

const StyledInputContainer = styled.div<IStyledInputContainer>`
  display: grid;
  align-items: center;
  box-sizing: border-box;
  user-select: none;
  border-radius: ${inube.spacing.s100};
  padding: ${inube.spacing.s100} ${inube.spacing.s200};
  gap: ${inube.spacing.s100};

  background: ${({ theme, isDisabled }) =>
    isDisabled &&
    (theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear)};

  grid-template-columns: 1fr auto;
  border: 1px solid
    ${({ theme, isDisabled, state, isFocused }) => {
      if (isDisabled) {
        return (
          (theme.color?.text?.dark?.disabled ||
            inube.color.text.dark.disabled) +
          "; pointer-events: none; opacity: 0.5;"
        );
      }
      if (isFocused) {
        return (
          theme.color?.text?.primary?.hover || inube.color.text.primary.hover
        );
      }
      if (state === "invalid") {
        return (
          theme.color?.text?.error?.regular || inube.color.text.error.regular
        );
      }
      return (
        theme.color?.palette?.neutral?.N40 || inube.color.palette.neutral.N40
      );
    }};
`;

interface IStyledInput {
  isDisabled: boolean;
  isFullWidth: boolean;
  isFocused?: boolean;
  state: string;
  $size: InputSize;
}

const StyledInput = styled.input<IStyledInput>`
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  outline: none;

  font-family: ${({ theme }) =>
    theme.typography?.body?.medium?.font || inube.typography.body.medium.font};
  font-size: ${({ theme }) =>
    theme.typography?.body?.medium?.size || inube.typography.body.medium.size};
  font-weight: ${({ theme }) =>
    theme.typography?.body?.medium?.weight ||
    inube.typography.body.medium.weight};
  letter-spacing: ${({ theme }) =>
    theme.typography?.body?.medium?.tracking ||
    inube.typography.body.medium.tracking};
  line-height: ${({ theme }) =>
    theme.typography?.body?.medium?.lineHeight ||
    inube.typography.body.medium.lineHeight};

  color: ${({ theme, isDisabled, readOnly }) => {
    if (isDisabled) {
      return (
        theme.color?.text?.dark?.disabled || inube.color.text.dark.disabled
      );
    }
    if (readOnly) {
      return theme.color?.text?.gray?.hover || inube.color.text.gray.hover;
    }
    return theme.color?.text?.dark?.regular || inube.color.text.dark.regular;
  }};
  background: ${({ theme, isDisabled }) =>
    isDisabled &&
    (theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear)};
  border: none;

  width: ${({ isFullWidth }) => (isFullWidth ? "calc(100% - 32px)" : "252px")};
  height: ${({ $size }) =>
    $size === "compact" ? `${inube.spacing.s300}` : `${inube.spacing.s400}`};
  border: none;

  ::placeholder {
    color: ${({ theme }) =>
      theme.color?.text?.dark?.disabled || inube.color.text.dark.disabled};
  }

  &:focus {
    outline: none;
    border-width: ${inube.spacing.s025};
  }

  &::-webkit-search-cancel-button {
    display: none;
  }

  &::-moz-search-cancel-button {
    display: none;
  }

  &:-webkit-autofill {
    -webkit-background-clip: text;
    background-clip: text;
  }
`;

interface IStyledIcon {
  isDisabled?: boolean;
}

const StyledIcon = styled.div<IStyledIcon>`
  display: grid;
  justify-content: center;
  align-items: center;
  color: ${({ theme, isDisabled }) =>
    isDisabled &&
    (theme.color?.text?.dark?.hover || inube.color.text.dark.hover)};

  & svg {
    width: 24px;
    height: 24px;
  }
`;

interface IStyledMessageContainer {
  isDisabled?: boolean;
  state?: string;
}

const StyledErrorMessageContainer = styled.div<IStyledMessageContainer>`
  display: flex;
  align-items: center;
  pointer-events: none;
  gap: ${inube.spacing.s050};

  color: ${({ theme, isDisabled, state }) => {
    if (isDisabled) {
      return (
        theme.color?.text?.dark?.disabled || inube.color.text.dark.disabled
      );
    }
    if (state === "valid") {
      return (
        theme.color?.text?.primary?.regular || inube.color.text.primary?.regular
      );
    }
    if (state === "invalid") {
      return (
        theme.color?.text?.error?.regular || inube.color.text.error.regular
      );
    }
    return theme.color?.text?.dark?.regular || inube.color.text.dark.regular;
  }};

  margin-top: ${inube.spacing.s050};

  & svg {
    width: 14px;
    height: 14px;
    padding-left: ${inube.spacing.s200};
  }
`;

const StyledValidMessageContainer = styled.div<IStyledMessageContainer>`
  display: flex;
  align-items: center;
  pointer-events: none;
  gap: ${inube.spacing.s050};

  color: ${({ theme, isDisabled, state }) => {
    if (isDisabled) {
      return (
        theme.color?.text?.dark?.disabled || inube.color.text.dark.disabled
      );
    }
    if (state === "valid") {
      return (
        theme.color?.text?.success?.regular || inube.color.text.success?.regular
      );
    }
    if (state === "invalid") {
      return (
        theme.color?.text?.error?.regular || inube.color.text.error.regular
      );
    }
    return theme.color?.text?.dark?.regular || inube.color.text.dark.regular;
  }};

  margin-top: ${inube.spacing.s050};

  & svg {
    width: 14px;
    height: 14px;
    padding-left: ${inube.spacing.s200};
  }
`;

export {
  StyledContainer,
  StyledContainerLabel,
  StyledErrorMessageContainer,
  StyledIcon,
  StyledInput,
  StyledInputContainer,
  StyledValidMessageContainer,
};
