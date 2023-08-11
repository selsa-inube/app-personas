import styled, { keyframes } from "styled-components";

import { inube } from "../../tokens";
import { SpinnerAppearanceType, SpinnerSizeType } from "./types";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface IStyledSpinner {
  appearance?: SpinnerAppearanceType;
  size?: SpinnerSizeType;
  track?: boolean;
}

const StyledSpinner = styled.div<IStyledSpinner>`
  box-sizing: border-box;
  width: ${({ size }) => {
    if (size === "large") {
      return "40px";
    }

    if (size === "medium") {
      return "32px";
    }

    return "24px";
  }};

  height: ${({ size }) => {
    if (size === "large") {
      return "40px";
    }

    if (size === "medium") {
      return "32px";
    }

    return "24px";
  }};

  border-width: 4px;
  border-style: solid;
  border-radius: 50%;
  border-color: ${({ theme, track }) => {
    if (track) {
      return (
        theme.color?.stroke?.spinner?.regular ||
        inube.color.stroke.spinner.regular
      );
    }

    return "transparent";
  }};
  border-left-color: ${({ theme, appearance }) =>
    (appearance && theme.color?.stroke?.[appearance]?.regular) ||
    (appearance && inube.color.stroke[appearance].regular)};

  animation: ${spin} 1500ms linear infinite;
`;

export { StyledSpinner };
