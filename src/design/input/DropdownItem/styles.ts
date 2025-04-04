import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledDropdownItem {
  $disabled: boolean;
  $isFocused: boolean;
  $isSelected: boolean;
}

const StyledDropdownItem = styled.li<IStyledDropdownItem>`
  display: flex;
  align-items: center;
  align-self: stretch;
  min-height: ${inube.spacing.s500};
  padding: ${inube.spacing.s050} ${inube.spacing.s200} ${inube.spacing.s050}
    ${inube.spacing.s150};
  cursor: ${({ $disabled }) => (!$disabled ? "pointer" : "not-allowed")};

  border-left: ${inube.spacing.s050} solid
    ${({ theme, $isFocused }) =>
      $isFocused
        ? theme.color?.stroke?.primary?.regular ||
          inube.color.stroke.primary.regular
        : "transparent"};

  p {
    color: ${({ theme, $disabled, $isFocused }) => {
      if ($disabled) {
        return (
          theme.color?.text?.dark?.disabled || inube.color.text.dark.disabled
        );
      }
      if ($isFocused) {
        return (
          theme.color?.text?.primary?.regular ||
          inube.color.text.primary.regular
        );
      }
      return theme.color?.text?.dark?.regular || inube.color.text.dark.regular;
    }};
  }

  &:hover {
    border-left: ${inube.spacing.s050} solid
      ${({ theme, $disabled }) =>
        $disabled
          ? "none"
          : theme.color?.stroke?.primary?.regular ||
            inube.color.stroke.primary.regular};

    background-color: ${({ theme }) =>
      theme.color?.surface?.gray?.hover || inube.color.surface.gray.hover};

    p {
      color: ${({ theme, $disabled }) =>
        $disabled
          ? theme.color?.text?.dark?.disabled || inube.color.text.dark.disabled
          : theme.color?.text?.primary?.regular ||
            inube.color.text.primary.regular};
    }
  }
`;

export { StyledDropdownItem };
