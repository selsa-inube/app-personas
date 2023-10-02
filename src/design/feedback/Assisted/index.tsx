import { AssistedUI } from "./interface";
import { IStep } from "./types";

interface AssistedProps {
  steps: IStep[];
  currentStep: number;
  stepsFlow?: number[];
  handleStepChange: (stepId: number) => void;
  handleFinishAssisted: () => void;
}

function Assisted(props: AssistedProps) {
  const {
    steps,
    currentStep,
    stepsFlow,
    handleStepChange,
    handleFinishAssisted,
  } = props;

  const activeSteps = stepsFlow
    ? steps.filter((step) => stepsFlow.includes(step.id))
    : steps;

  const currentStepIndex = activeSteps.findIndex(
    (step) => step.id === currentStep
  );

  const currentStepInfo = activeSteps.find((step) => step.id === currentStep);

  const lastStepIndex = activeSteps.length - 1;

  const handleNextStep = () => {
    if (currentStepIndex === activeSteps.length - 1) {
      handleFinishAssisted();
      return;
    }
    handleStepChange(activeSteps[currentStepIndex + 1].id);
  };

  const handlePreviousStep = () => {
    if (currentStepIndex === 0) return;
    handleStepChange(activeSteps[currentStepIndex - 1].id);
  };

  return (
    <AssistedUI
      steps={activeSteps}
      currentStepIndex={currentStepIndex}
      handlePreviousStep={handlePreviousStep}
      handleNextStep={handleNextStep}
      currentStepInfo={currentStepInfo}
      lastStepIndex={lastStepIndex}
    />
  );
}

export { Assisted };
export type { AssistedProps };
