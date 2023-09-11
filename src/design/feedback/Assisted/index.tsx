import { IStep } from "./types";
import { AssistedUI } from "./interface";

interface AssistedProps {
  steps: IStep[];
  currentStep: number;
  handleStepChange: (stepId: number) => void;
  handleFinishAssisted: () => void;
}

function Assisted(props: AssistedProps) {
  const { steps, currentStep, handleStepChange, handleFinishAssisted } = props;

  const handleNextStep = () => {
    const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentStepIndex === steps.length - 1) {
      handleFinishAssisted();
      return;
    }
    handleStepChange(steps[currentStepIndex + 1].id);
  };

  const handlePreviousStep = () => {
    const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentStepIndex === 0) return;
    handleStepChange(steps[currentStepIndex - 1].id);
  };

  const currentStepInfo = steps.find((step) => step.id === currentStep);
  const lastStep = Math.max(...steps.map((step) => step.id));

  return (
    <AssistedUI
      steps={steps}
      currentStep={currentStep}
      handlePreviousStep={handlePreviousStep}
      handleNextStep={handleNextStep}
      currentStepInfo={currentStepInfo}
      lastStep={lastStep}
    />
  );
}

export type { AssistedProps };
export { Assisted };
