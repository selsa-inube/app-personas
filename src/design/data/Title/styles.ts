import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledIcon {
  parentDisabled?: boolean;
}

const StyledIcon = styled.picture<IStyledIcon>`
  width: 24px;
  height: 24px;
  & svg {
    width: 24px;
    height: 24px;
    color: ${({ theme, parentDisabled }) => {
      if (parentDisabled) {
        return (
          theme.color?.text?.dark?.disabled || inube.color.text.dark.disabled
        );
      }
      return theme.color?.text?.dark?.regular || inube.color.text.dark.regular;
    }};

    &:hover {
      cursor: ${({ parentDisabled }) => {
        if (!parentDisabled) {
          return "pointer";
        }
      }};
    }
  }
`;

export { StyledIcon };
