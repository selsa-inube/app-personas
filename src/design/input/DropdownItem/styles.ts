import styled from "styled-components";
import { inube } from "@design/tokens";

interface IDropdownItem {
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
}

const StyledDropdownItem = styled.li<IDropdownItem>`
  display: flex;
  align-items: center;
  align-self: stretch;
  min-height: ${inube.spacing.s500};
  padding: ${inube.spacing.s050} ${inube.spacing.s200};
  cursor: ${({ isDisabled }) => (!isDisabled ? "pointer" : "not-allowed")};

  color: ${({ theme }) =>
    theme.color?.surface?.gray?.hover || inube.color.surface.gray.hover};

  border-left: 5px solid
    ${({ theme, isFocused }) =>
      isFocused
        ? theme.color?.stroke?.primary?.regular ||
          inube.color.stroke.primary.regular
        : "none"};

  p {
    color: ${({ theme, isDisabled, isFocused }) => {
      if (isDisabled) {
        return (
          theme.color?.text?.dark?.disabled || inube.color.text.dark.disabled
        );
      }
      if (isFocused) {
        return (
          theme.color?.text?.primary?.regular ||
          inube.color.text.primary.regular
        );
      }
      return theme.color?.text?.dark?.regular || inube.color.text.dark.regular;
    }};
  }

  &:hover {
    border-left: 5px solid
      ${({ theme, isDisabled }) =>
        isDisabled
          ? "none"
          : theme.color?.stroke?.primary?.regular ||
            inube.color.stroke.primary.regular};

    p {
      color: ${({ theme, isDisabled }) =>
        isDisabled
          ? theme.color?.text?.dark?.disabled || inube.color.text.dark.disabled
          : theme.color?.text?.primary?.regular ||
            inube.color.text.primary.regular};
    }
  }
`;

export { StyledDropdownItem };
