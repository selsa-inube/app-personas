import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  background-color: ${({ theme }) =>
    theme.color?.surface?.light.clear || inube.color.surface.light.clear};
  border: none;
  border-radius: 5px;
  padding: 4px;
  width: 24px;
  height: 24px;

  & svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) =>
      theme.color?.text?.dark?.regular || inube.color.text.dark.regular};
  }
`;

export { StyledButton };
