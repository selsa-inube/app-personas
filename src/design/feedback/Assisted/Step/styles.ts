import { inube } from "@design/tokens";
import styled, { css } from "styled-components";

interface IStyledBackgroundColor {
  isPreviousStep: boolean;
  smallScreen: boolean;
  currentStep?: boolean;
}

const backgroundColor = css<IStyledBackgroundColor>`
  background-color: ${({ currentStep, isPreviousStep, theme }) =>
    currentStep || isPreviousStep
      ? theme.color?.text?.primary.regular || inube.color.text.primary.regular
      : theme.color?.surface?.dark.clear || inube.color.surface.dark.clear};
`;

const StyledStep = styled.div`
  position: relative;
  min-width: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s100 : inube.spacing.s200};
  height: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s100 : inube.spacing.s200};
  border-radius: 50%;
  ${backgroundColor}
`;

const StyledLine = styled.div`
  width: 100%;
  margin: 0 ${({ smallScreen }) => (smallScreen ? "-5px" : "-7px")};
  ${backgroundColor}
`;

export { StyledStep, StyledLine };
