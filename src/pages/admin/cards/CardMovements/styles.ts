import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledContainer = styled.section`
  padding: 0 ${inube.spacing.s250};
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  border-color: ${({ theme }) =>
    theme.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${inube.spacing.s200} 0;
`;

export { StyledContainer, StyledItem };
