import styled from "styled-components";
import { inube } from "../../../../tokens";

const StyledSquare = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: black;
  background-color: ${({ theme }) =>
    theme.color?.surface?.primary?.regular ||
    inube.color.surface.primary.regular};
  color: ${({ theme }) =>
    theme.color?.text?.light?.regular || inube.color.text.light.regular};
`;

export { StyledSquare };
