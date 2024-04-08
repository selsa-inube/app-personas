import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledTotalPayment {
  isMobile: boolean;
}

const StyledTotalPayment = styled.div<IStyledTotalPayment>`
  display: flex;
  padding: ${inube.spacing.s100} ${inube.spacing.s200};
  gap: ${inube.spacing.s150};
  border-radius: ${inube.spacing.s100};
  background: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  border: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  width: ${({ isMobile }) => (isMobile ? "100%" : "auto")};
  justify-content: ${({ isMobile }) => (isMobile ? "center" : "left")};
`;

export { StyledTotalPayment };
