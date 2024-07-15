import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledMovementsContainer {
  $isMobile: boolean;
}

const StyledMovementsContainer = styled.div<IStyledMovementsContainer>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${inube.spacing.s200};
  padding: ${({ $isMobile }) =>
    $isMobile
      ? `${inube.spacing.s300} ${inube.spacing.s150}`
      : `${inube.spacing.s250}`};
  align-items: flex-end;
  border-radius: ${inube.spacing.s100};
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;

export { StyledMovementsContainer };
