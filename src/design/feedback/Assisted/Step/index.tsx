import { StyledStep, StyledLine } from "./styles";

interface StepProps {
  stepNumber: number;
  currentStep: number;
  lastStep: number;
  smallScreen: boolean;
}

function Step(props: StepProps) {
  const { stepNumber, currentStep, lastStep, smallScreen } = props;
  const isLastStep: boolean = stepNumber === lastStep;
  const isPreviousStep: boolean = stepNumber < currentStep;
  const isCurrentStep: boolean = stepNumber === currentStep;

  return (
    <>
      <StyledStep
        isPreviousStep={isPreviousStep}
        currentStep={isCurrentStep}
        smallScreen={smallScreen}
      />
      {!isLastStep && (
        <StyledLine isPreviousStep={isPreviousStep} smallScreen={smallScreen} />
      )}
    </>
  );
}

export { Step };
