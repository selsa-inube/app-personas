import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledSummaryContainer {
  fixed: boolean;
}

const StyledSummaryContainer = styled.div<IStyledSummaryContainer>`
  display: flex;
  flex-direction: column;
  gap: ${inube.spacing.s100};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  position: ${({ fixed }) => (fixed ? "fixed" : "initial")};
  bottom: ${({ fixed }) => (fixed ? "45px" : "initial")};
  left: ${({ fixed }) => (fixed ? 0 : "initial")};
  right: ${({ fixed }) => (fixed ? 0 : "initial")};
  box-sizing: ${({ fixed }) => (fixed ? "border-box" : "initial")};
  width: ${({ fixed }) => (fixed ? "100%" : "initial")};
  padding: ${({ fixed }) =>
    fixed
      ? `0 ${inube.spacing.s300} ${inube.spacing.s300} ${inube.spacing.s300}`
      : "initial"};
`;

export { StyledSummaryContainer };
