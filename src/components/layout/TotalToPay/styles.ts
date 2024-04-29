import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledTotalPayment {
  isMobile: boolean;
}

const StyledTotalPayment = styled.div<IStyledTotalPayment>`
  display: flex;
  align-items: center;
  padding: ${inube.spacing.s100} ${inube.spacing.s200};
  gap: ${inube.spacing.s150};
  border-radius: ${inube.spacing.s100};
  background: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  border: 2px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  width: ${({ isMobile }) => (isMobile ? "100%" : "auto")};
  justify-content: ${({ isMobile }) => (isMobile ? "center" : "left")};
`;

interface IStyledTagValue {
  isExpandable: boolean;
}

const StyledTagValue = styled.div<IStyledTagValue>`
  display: flex;
  align-items: center;
  gap: ${inube.spacing.s025};
  padding: ${inube.spacing.s0} ${inube.spacing.s050};
  border-radius: ${inube.spacing.s050};
  background: ${({ theme, isExpandable }) =>
    isExpandable
      ? theme.color?.surface?.gray?.regular || inube.color.surface.gray.regular
      : `transparent`};
`;

export { StyledTotalPayment, StyledTagValue };
