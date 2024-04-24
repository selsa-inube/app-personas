import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledButtonsContainer {
  fixed: boolean;
}

const StyledButtonsContainer = styled.div<IStyledButtonsContainer>`
  display: flex;
  justify-content: flex-end;
  gap: ${inube.spacing.s150};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  position: ${({ fixed }) => (fixed ? "fixed" : "initial")};
  bottom: ${({ fixed }) => (fixed ? "-1px" : "initial")};
  left: ${({ fixed }) => (fixed ? 0 : "initial")};
  right: ${({ fixed }) => (fixed ? 0 : "initial")};
  box-sizing: ${({ fixed }) => (fixed ? "border-box" : "initial")};
  width: ${({ fixed }) => (fixed ? "100%" : "initial")};
  padding: ${({ fixed }) =>
    fixed
      ? `0 ${inube.spacing.s300} ${inube.spacing.s200} ${inube.spacing.s300}`
      : "initial"};
`;

export { StyledButtonsContainer };
