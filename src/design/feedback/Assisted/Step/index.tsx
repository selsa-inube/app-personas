import { StyledLine, StyledStepContainer } from "./styles";

interface StepProps {
  stepNumber: number;
  currentStep: number;
  lastStep: number;
  smallScreen: boolean;
}

function Step(props: StepProps) {
  const { stepNumber, currentStep, lastStep, smallScreen } = props;

  const isFirstStep = stepNumber === 1;
  const isLastStep = stepNumber === lastStep;
  const isPreviousStep = stepNumber < currentStep;
  const isCurrentStep = stepNumber === currentStep;

  return (
    <StyledStepContainer isFirstStep={isFirstStep} isLastStep={isLastStep}>
      <StyledLine
        isFirstStep={isFirstStep}
        isPreviousStep={isPreviousStep}
        smallScreen={smallScreen}
        isCurrentStep={isCurrentStep}
      />
    </StyledStepContainer>
  );
}

export { Step };
