import styled from "styled-components";
import { inube } from "../../tokens";
import {
  IconAppearanceType,
  IconShapeType,
  IconSpacingType,
  IconVariantType,
} from "./types";

const filledAppearancesWithGrayIcon = ["gray", "light"];
interface IStyledIcon {
  $appearance: IconAppearanceType;
  $spacing: IconSpacingType;
  $variant: IconVariantType;
  $shape: IconShapeType;
  $size: string;
  $cursorHover: boolean;
  $parentHover: boolean;
  $disabled: boolean;
}

const StyledIcon = styled.figure<IStyledIcon>`
  display: inline-block;
  padding: 0;
  margin: 0;

  border-radius: ${({ $shape }) => ($shape === "circle" ? "50%" : "8px")};
  border-width: ${({ $variant }) => ($variant === "outlined" ? "1px" : "0px")};
  border-style: solid;
  border-color: ${({ theme, $appearance, $parentHover, $disabled }) => {
    if ($disabled) {
      return (
        theme.color?.stroke?.[$appearance]?.disabled ||
        inube.color.stroke[$appearance].disabled
      );
    }

    if ($parentHover) {
      return (
        theme.color?.stroke?.[$appearance]?.hover ||
        inube.color.stroke[$appearance].hover
      );
    }

    return (
      theme.color?.stroke?.[$appearance]?.regular ||
      inube.color.stroke[$appearance].regular
    );
  }};

  background-color: ${({
    theme,
    $variant,
    $appearance,
    $parentHover,
    $disabled,
  }) => {
    if ($variant === "filled") {
      if ($disabled) {
        return (
          theme.color?.surface?.[$appearance]?.disabled ||
          inube.color.surface[$appearance].disabled
        );
      }

      if ($parentHover) {
        return (
          theme.color?.surface?.[$appearance]?.hover ||
          inube.color.surface[$appearance].hover
        );
      }

      return (
        theme.color?.surface?.[$appearance]?.regular ||
        inube.color.surface[$appearance].regular
      );
    }
  }};

  color: ${({ theme, $variant, $appearance, $parentHover, $disabled }) => {
    if ($disabled) {
      return (
        theme.color?.text?.light?.disabled || inube.color.text.light.disabled
      );
    }

    if ($variant === "filled") {
      if (!filledAppearancesWithGrayIcon.includes($appearance)) {
        return (
          theme.color?.text?.light?.regular || inube.color.text.light.regular
        );
      }
      return theme.color?.text?.gray?.regular || inube.color.text.gray.regular;
    }

    if ($parentHover) {
      return (
        theme.color?.text?.[$appearance]?.hover ||
        inube.color.text[$appearance].hover
      );
    }

    return (
      theme.color?.text?.[$appearance]?.regular ||
      inube.color.text[$appearance].regular
    );
  }};

  & svg {
    display: block;
    width: ${({ $size }) => $size};
    height: ${({ $size }) => $size};
    padding: ${({ $spacing }) => {
      if ($spacing === "wide") {
        return inube.spacing.s100;
      }
      if ($spacing === "compact") {
        return inube.spacing.s050;
      }
      if ($spacing === "none") {
        return inube.spacing.s0;
      }
      return inube.spacing.s025;
    }};
  }

  &:hover {
    cursor: ${({ $cursorHover, $disabled }) => {
      if (!$disabled) {
        if ($cursorHover) {
          return "pointer";
        }
      }
    }};

    border-color: ${({ theme, $cursorHover, $appearance, $disabled }) => {
      if (!$disabled) {
        if ($cursorHover) {
          return (
            theme.color?.text?.[$appearance]?.hover ||
            inube.color.text[$appearance].hover
          );
        }
      }
    }};

    background-color: ${({
      theme,
      $variant,
      $appearance,
      $cursorHover,
      $disabled,
    }) => {
      if (!$disabled) {
        if ($variant === "filled") {
          if ($cursorHover) {
            return (
              theme.color?.surface?.[$appearance]?.hover ||
              inube.color.surface[$appearance].hover
            );
          }
        }
      }
    }};
  }

  &:hover svg {
    color: ${({ theme, $cursorHover, $variant, $appearance, $disabled }) => {
      if (!$disabled) {
        if ($cursorHover) {
          if ($variant === "filled") {
            if (!filledAppearancesWithGrayIcon.includes($appearance)) {
              return (
                theme.color?.text?.light?.hover || inube.color.text.light.hover
              );
            }
            return (
              theme.color?.text?.gray?.hover || inube.color.text.gray.hover
            );
          } else {
            return (
              theme.color?.text?.[$appearance]?.hover ||
              inube.color.text[$appearance].hover
            );
          }
        }
      }
    }};
  }
`;

export { StyledIcon };
