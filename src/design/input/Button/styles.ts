import { AppearanceType, SpacingType, VariantType } from "@ptypes/design.types";
import styled from "styled-components";
import { inube } from "../../tokens";
import { Link } from "react-router-dom";

interface IStyledButton {
  spacing: SpacingType;
  fullwidth: boolean;
  variant: VariantType;
  appearance: AppearanceType;
  disabled: boolean;
  load: boolean;
}

interface IStyledLink {
  spacing: SpacingType;
  fullwidth: boolean;
  variant: VariantType;
  appearance: AppearanceType;
  disabled: boolean;
  load: boolean;
}

interface IStyledSpinnerContainer {
  variant: VariantType;
}

interface IStyledButtonContent {
  load: boolean;
  disabled: boolean;
}

const StyledLink = styled(Link)<IStyledLink>`
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  text-decoration: none;
  height: ${({ spacing }) =>
    spacing === "wide" ? inube.spacing.s450 : inube.spacing.s350};
  width: ${({ fullwidth }) => (fullwidth ? "100%" : "max-content")};
  min-width: 100px;
  max-width: ${({ fullwidth }) => !fullwidth && "300px"};

  padding: 0
    ${({ spacing }) =>
      spacing === "wide" ? inube.spacing.s200 : inube.spacing.s150};

  cursor: pointer;

  border-radius: 8px;
  border-style: solid;
  border-width: ${({ variant }) => (variant === "outlined" ? "1px" : "0px")};
  border-color: ${({ theme, appearance, disabled }) => {
    if (disabled) {
      return (
        theme.color?.stroke?.[appearance]?.disabled ||
        inube.color.stroke[appearance].disabled
      );
    }

    return (
      theme.color?.stroke?.[appearance]?.regular ||
      inube.color.stroke[appearance].regular
    );
  }};

  background-color: ${({ theme, appearance, variant, disabled }) => {
    if (variant === "filled") {
      if (disabled) {
        return (
          theme.color?.surface?.[appearance]?.disabled ||
          inube.color.surface[appearance].disabled
        );
      }
      return (
        theme.color?.surface?.[appearance]?.regular ||
        inube.color.surface[appearance].regular
      );
    }

    return "transparent";
  }};

  &:hover {
    border-color: ${({ theme, appearance, disabled }) => {
      if (!disabled) {
        return (
          theme.color?.stroke?.[appearance]?.hover ||
          inube.color.stroke[appearance].hover
        );
      }
    }};

    background-color: ${({ theme, appearance, variant, disabled, load }) => {
      if (!disabled && !load) {
        if (variant === "filled") {
          return (
            theme.color?.surface?.[appearance]?.hover ||
            inube.color.surface[appearance].hover
          );
        }
      }
    }};

    cursor: ${({ disabled, load }) => {
      if (load || disabled) {
        return "not-allowed";
      }
    }};
  }
`;

const StyledButton = styled.button<IStyledButton>`
  position: relative;
  box-sizing: border-box;

  height: ${({ spacing }) =>
    spacing === "wide" ? inube.spacing.s450 : inube.spacing.s350};
  width: ${({ fullwidth }) => (fullwidth ? "100%" : "max-content")};
  min-width: 100px;
  max-width: ${({ fullwidth }) => !fullwidth && "300px"};

  padding: 0
    ${({ spacing }) =>
      spacing === "wide" ? inube.spacing.s200 : inube.spacing.s150};

  cursor: pointer;

  border-radius: 8px;
  border-style: solid;
  border-width: ${({ variant }) => (variant === "outlined" ? "1px" : "0px")};
  border-color: ${({ theme, appearance, disabled }) => {
    if (disabled) {
      return (
        theme.color?.stroke?.[appearance]?.disabled ||
        inube.color.stroke[appearance].disabled
      );
    }

    return (
      theme.color?.stroke?.[appearance]?.regular ||
      inube.color.stroke[appearance].regular
    );
  }};

  background-color: ${({ theme, appearance, variant, disabled }) => {
    if (variant === "filled") {
      if (disabled) {
        return (
          theme.color?.surface?.[appearance]?.disabled ||
          inube.color.surface[appearance].disabled
        );
      }
      return (
        theme.color?.surface?.[appearance]?.regular ||
        inube.color.surface[appearance].regular
      );
    }

    return "transparent";
  }};

  &:hover {
    border-color: ${({ theme, appearance, disabled }) => {
      if (!disabled) {
        return (
          theme.color?.stroke?.[appearance]?.hover ||
          inube.color.stroke[appearance].hover
        );
      }
    }};

    background-color: ${({ theme, appearance, variant, disabled, load }) => {
      if (!disabled && !load) {
        if (variant === "filled") {
          return (
            theme.color?.surface?.[appearance]?.hover ||
            inube.color.surface[appearance].hover
          );
        }
      }
    }};

    cursor: ${({ disabled, load }) => {
      if (load || disabled) {
        return "not-allowed";
      }
    }};
  }
`;

const StyledSpinnerContainer = styled.div<IStyledSpinnerContainer>`
  position: absolute;
  height: inherit;
  top: ${({ variant }) => (variant === "outlined" ? "-1px" : "0")};
  left: 0;
  right: 0;
`;

const StyledButtonContent = styled.div<IStyledButtonContent>`
  opacity: ${({ load, disabled }) => {
    if (load && !disabled) {
      return 0;
    }
  }};
`;

export {
  StyledButton,
  StyledButtonContent,
  StyledSpinnerContainer,
  StyledLink,
};
