import styled from "styled-components";
import { TypographySizeType } from "@ptypes/typography.types";
import { inube } from "@design/tokens";

interface IStyledLabel {
  $isDisabled: boolean;
  $isFocused: boolean;
  $isInvalid: boolean;
  $size: TypographySizeType;
}

const StyledLabel = styled.label<IStyledLabel>`
  display: flex;
  font-family: ${({ $size, theme }) =>
    theme.typography?.label?.[$size]?.font || inube.typography.label[$size].font};

  font-size: ${({ $size, theme }) =>
    theme.typography?.label?.[$size]?.size || inube.typography.label[$size].size};

  font-weight: ${({ $size, theme }) =>
    theme.typography?.label?.[$size]?.weight ||
    inube.typography.label[$size].weight};

  letter-spacing: ${({ $size, theme }) =>
    theme.typography?.label?.[$size]?.tracking ||
    inube.typography.label[$size].tracking};

  line-height: ${({ $size, theme }) =>
    theme.typography?.label?.[$size]?.lineHeight ||
    inube.typography.label[$size].lineHeight};

  color: ${({ theme, $isDisabled, $isFocused, $isInvalid }) => {
    if ($isDisabled) {
      return (
        theme.color?.text?.dark?.disabled || inube.color.text.dark.disabled
      );
    }
    if ($isFocused) {
      return (
        theme.color?.text?.primary?.hover ||
        inube.color.text.primary.hover
      );
    }
    if ($isInvalid) {
      return (
        theme.color?.text?.error?.regular || inube.color.text.danger.regular
      );
    }
    return theme.color?.text?.dark?.regular || inube.color.text.dark.regular;
  }};
`;

export { StyledLabel };
