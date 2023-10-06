import { FormikProps } from "formik";
import { useRef, useState } from "react";
import { creditSimulationRequestSteps } from "./config/assisted";
import { initalValuesCreditSimulation } from "./config/initialValues";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { CreditSimulationRequestUI } from "./interface";
import {
  IFormsCreditSimulationRequest,
  IFormsCreditSimulationRequestRefs,
} from "./types";

function CreditSimulationRequest() {
  const [currentStep, setCurrentStep] = useState(
    creditSimulationRequestSteps.destination.id
  );
  const steps = Object.values(creditSimulationRequestSteps);
  const [creditSimulationRequest, setCreditSimulationRequest] =
    useState<IFormsCreditSimulationRequest>({
      destination: initalValuesCreditSimulation.destination,
    });

  const destinationRef = useRef<FormikProps<IDestinationEntry>>(null);

  const formReferences: IFormsCreditSimulationRequestRefs = {
    destination: destinationRef,
  };

  const handleStepChange = (stepId: number) => {
    const stepKey = Object.entries(creditSimulationRequestSteps).find(
      ([, config]) => config.id === currentStep
    )?.[0];

    if (stepKey) {
      const values =
        formReferences[stepKey as keyof IFormsCreditSimulationRequestRefs]
          ?.current?.values;

      setCreditSimulationRequest((prevInvitationData) => ({
        ...prevInvitationData,
        [stepKey]: values,
      }));
    }

    setCurrentStep(stepId);
  };

  const handleFinishAssisted = () => {};

  const handleNextStep = () => {
    if (currentStep + 1 <= steps.length) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    handleStepChange(currentStep - 1);
  };

  return (
    <CreditSimulationRequestUI
      creditSimulationRequest={creditSimulationRequest}
      currentStep={currentStep}
      formReferences={formReferences}
      handleFinishAssisted={handleFinishAssisted}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleStepChange={handleStepChange}
      steps={steps}
    />
  );
}

export { CreditSimulationRequest };
