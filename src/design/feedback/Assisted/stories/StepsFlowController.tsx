import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { Assisted, AssistedProps } from "..";

const handleStepChangeAction = action(`Step changed to`);

const StepsFlowController = (props: AssistedProps) => {
  const [configSteps] = useState(props.stepsFlow || []);
  const [currentStep, setCurrentStep] = useState(configSteps[0]);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    handleStepChangeAction(step);
  };

  return (
    <Assisted
      {...props}
      onStepChange={handleStepChange}
      currentStep={currentStep}
      stepsFlow={configSteps}
    />
  );
};

export { StepsFlowController };
