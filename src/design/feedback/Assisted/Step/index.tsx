import { StyledLine, StyledStepContainer } from "./styles";

interface StepProps {
  stepNumber: number;
  currentStepIndex: number;
  lastStepIndex: number;
  smallScreen: boolean;
}

function Step(props: StepProps) {
  const { stepNumber, currentStepIndex, lastStepIndex, smallScreen } = props;

  const isFirstStep = stepNumber === 0;
  const isLastStep = stepNumber === lastStepIndex;
  const isPreviousStep = stepNumber < currentStepIndex;
  const isCurrentStep = stepNumber === currentStepIndex;

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
