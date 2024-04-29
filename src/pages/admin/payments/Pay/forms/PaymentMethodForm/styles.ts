import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledSummaryContainer {
  fixed: boolean;
}

const StyledSummaryContainer = styled.div<IStyledSummaryContainer>`
  display: flex;
  flex-direction: column;
  gap: ${inube.spacing.s300};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  position: ${({ fixed }) => (fixed ? "fixed" : "initial")};
  bottom: ${({ fixed }) => (fixed ? "43px" : "initial")};
  left: ${({ fixed }) => (fixed ? 0 : "initial")};
  right: ${({ fixed }) => (fixed ? 0 : "initial")};
  box-sizing: ${({ fixed }) => (fixed ? "border-box" : "initial")};
  width: ${({ fixed }) => (fixed ? "100%" : "initial")};
  padding: ${({ fixed }) =>
    fixed
      ? `${inube.spacing.s050} ${inube.spacing.s300} ${inube.spacing.s300} ${inube.spacing.s300}`
      : "initial"};
`;

interface IStyledPendingValueContainer {
  isMobile: boolean;
}

const StyledPendingValueContainer = styled.div<IStyledPendingValueContainer>`
  display: flex;
  padding: ${inube.spacing.s100} ${inube.spacing.s150};
  gap: ${inube.spacing.s150};
  border-radius: ${inube.spacing.s100};
  background: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  border: 2px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  width: ${({ isMobile }) => (isMobile ? "100%" : "initial")};
  align-items: center;
  justify-content: center;
`;

export { StyledPendingValueContainer, StyledSummaryContainer };
