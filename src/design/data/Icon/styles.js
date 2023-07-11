import styled from "styled-components";

import { inube } from "../../tokens";

const StyledIcon = styled.figure`
  display: inline-block;
  padding: 0;
  margin: 0;

  border-radius: ${({ shape }) => (shape === "circle" ? "50%" : "8px")};
  border-width: ${({ variant }) => (variant === "outlined" ? "1px" : "0px")};
  border-style: solid;
  border-color: ${({ theme, appearance }) =>
    theme.color?.stroke?.[appearance]?.regular ||
    inube.color.stroke[appearance].regular};

  background-color: ${({ theme, variant, appearance }) => {
    if (variant === "filled") {
      return (
        theme.color?.surface?.[appearance]?.regular ||
        inube.color.surface[appearance].regular
      );
    }
  }};

  color: ${({ theme, variant, appearance, parentHover }) => {
    if (variant === "filled") {
      return (
        theme.color?.text?.light?.regular || inube.color.text.light.regular
      );
    }

    if (!parentHover) {
      return (
        theme.color?.text?.[appearance]?.regular ||
        inube.color.text[appearance].regular
      );
    } else {
      return (
        theme.color?.text?.[appearance]?.hover ||
        inube.color.text[appearance].hover
      );
    }
  }};

  & svg {
    display: block;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    padding: ${({ spacing }) => {
      if (spacing === "wide") {
        return inube.spacing.s100;
      }
      if (spacing === "compact") {
        return inube.spacing.s050;
      }
      return inube.spacing.s025;
    }};
  }

  &:hover {
    cursor: ${({ cursorHover }) => cursorHover && "pointer"};
    border-color: ${({ theme, cursorHover, appearance }) => {
      if (cursorHover) {
        return (
          theme.color?.text?.[appearance]?.hover ||
          inube.color.text[appearance].hover
        );
      }
    }};

    background-color: ${({ theme, variant, appearance }) => {
      if (variant === "filled") {
        return (
          theme.color?.surface?.[appearance]?.hover ||
          inube.color.surface[appearance].hover
        );
      }
    }};
  }

  &:hover svg {
    color: ${({ theme, cursorHover, variant, appearance }) => {
      if (cursorHover) {
        if (variant === "filled") {
          return (
            theme.color?.text?.light?.hover || inube.color.text.light.hover
          );
        } else {
          return (
            theme.color?.text?.[appearance]?.hover ||
            inube.color.text[appearance].hover
          );
        }
      }
    }};
  }
`;

export { StyledIcon };
