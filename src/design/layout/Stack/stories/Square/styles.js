import styled from "styled-components";
import { inube } from "../../../../tokens";

const StyledSquare = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: black;
  background-color: ${({ theme }) =>
    theme.color?.surface?.primary?.regular ||
    inube.color.surface.primary.regular};
`;

export { StyledSquare };
