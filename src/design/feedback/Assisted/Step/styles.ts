import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledStepContainer {
  isFirstStep: boolean;
  isLastStep: boolean;
}

const StyledStepContainer = styled.div<IStyledStepContainer>`
  width: 100%;
  border-top-left-radius: ${({ isFirstStep }) => (isFirstStep ? "25px" : "0")};
  border-bottom-left-radius: ${({ isFirstStep }) =>
    isFirstStep ? "25px" : "0"};
  border-top-right-radius: ${({ isLastStep }) => (isLastStep ? "25px" : "0")};
  border-bottom-right-radius: ${({ isLastStep }) =>
    isLastStep ? "25px" : "0"};
  background-color: ${({ theme }) =>
    inube.color.surface.dark.clear || theme.color?.surface?.dark.clear};
`;

interface IStyledLine {
  isPreviousStep: boolean;
  smallScreen: boolean;
  isCurrentStep: boolean;
  isFirstStep: boolean;
}

const StyledLine = styled.div<IStyledLine>`
  border-top-left-radius: ${({ isFirstStep }) => (isFirstStep ? "25px" : "0")};
  border-bottom-left-radius: ${({ isFirstStep }) =>
    isFirstStep ? "25px" : "0"};
  border-top-right-radius: ${({ isCurrentStep }) =>
    isCurrentStep ? "25px" : "0"};
  border-bottom-right-radius: ${({ isCurrentStep }) =>
    isCurrentStep ? "25px" : "0"};
  transition: width 0.15s ease-in-out,
    border-radius
      ${({ isCurrentStep }) =>
        isCurrentStep ? "0.16s ease-in" : "0.01s ease-out"};
  width: ${({ isCurrentStep, isPreviousStep }) =>
    isCurrentStep || isPreviousStep ? "100%" : "0%"};
  height: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s100 : inube.spacing.s200};
  background-color: ${({ theme }) =>
    theme.color?.text?.primary.regular || inube.color.text.primary.regular};
`;

export { StyledLine, StyledStepContainer };
