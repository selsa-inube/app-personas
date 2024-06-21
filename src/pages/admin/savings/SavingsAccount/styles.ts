import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledMovementsContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${inube.spacing.s200};
  padding: ${inube.spacing.s200} ${inube.spacing.s250};
  align-items: flex-end;
  border-radius: ${inube.spacing.s100};
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;

export { StyledMovementsContainer };
