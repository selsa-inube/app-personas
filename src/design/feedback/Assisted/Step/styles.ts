import { inube } from "@design/tokens";
import styled, { css } from "styled-components";

interface IStyledBackgroundColor {
  isPreviousStep: boolean;
  smallScreen: boolean;
  isCurrentStep: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  firstIsCurrent: boolean;
}

const backgroundColor = css<IStyledBackgroundColor>`
  background-color: ${({ isCurrentStep, isPreviousStep, theme }) =>
    isCurrentStep || isPreviousStep
      ? theme.color?.text?.primary.regular || inube.color.text.primary.regular
      : theme.color?.surface?.dark.clear || inube.color.surface.dark.clear};
`;

interface IStyledStepContainer {
  isFirstStep: boolean;
  isLastStep: boolean;
}

const StyledStepContainer = styled.div<IStyledStepContainer>`
  width: 100%;
  border-top-left-radius: ${({ isFirstStep }) => (isFirstStep ? "25px" : "0")};
  border-top-right-radius: ${({ isLastStep }) => (isLastStep ? "25px" : "0")};
  border-bottom-left-radius: ${({ isFirstStep }) =>
    isFirstStep ? "25px" : "0"};
  border-bottom-right-radius: ${({ isLastStep }) =>
    isLastStep ? "25px" : "0"};
  background-color: ${({ theme }) =>
    inube.color.surface.dark.clear || theme.color?.surface?.dark.clear};
`;

const StyledLine = styled.div`
  border-top-left-radius: ${({ isFirstStep }) => (isFirstStep ? "25px" : "0")};
  border-bottom-left-radius: ${({ isFirstStep }) =>
    isFirstStep ? "25px" : "0"};
  border-top-right-radius: ${({ isCurrentStep, isLastStep }) =>
    isCurrentStep || isLastStep ? "25px" : "0"};
  border-bottom-right-radius: ${({ isCurrentStep, isLastStep }) =>
    isCurrentStep || isLastStep ? "25px" : "0"};
  transition: width 0.2s ease-in-out;
  width: ${({ firstIsCurrent, smallScreen }) =>
    firstIsCurrent
      ? smallScreen
        ? inube.spacing.s100
        : inube.spacing.s200
      : "100%"};
  height: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s100 : inube.spacing.s200};
  ${backgroundColor}
`;

export { StyledLine, StyledStepContainer };
