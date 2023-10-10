import { FormikProps } from "formik";
import { useRef, useState } from "react";
import { creditSimulationRequestSteps } from "./config/assisted";
import { initalValuesCreditSimulation } from "./config/initialValues";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { ISimulationEntry } from "./forms/SimulationForm/types";
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
      simulation: initalValuesCreditSimulation.simulation,
    });
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const destinationRef = useRef<FormikProps<IDestinationEntry>>(null);
  const simulationRef = useRef<FormikProps<ISimulationEntry>>(null);

  const formReferences: IFormsCreditSimulationRequestRefs = {
    destination: destinationRef,
    simulation: simulationRef,
  };

  const handleStepsValuesRules = () => {
    switch (currentStep) {
      case creditSimulationRequestSteps.destination.id: {
        const destinationValues = destinationRef.current?.values;
        if (!destinationValues) return;

        setCreditSimulationRequest((prevCreditSimulationRequest) => ({
          ...prevCreditSimulationRequest,
          simulation: {
            ...prevCreditSimulationRequest.simulation,
            creditDestination: destinationValues?.creditDestination,
            product: destinationValues?.product,
          },
        }));
      }
    }
  };

  const handleStepChange = (stepId: number) => {
    handleStepsValuesRules();

    const currentStepKey = Object.entries(creditSimulationRequestSteps).find(
      ([, config]) => config.id === currentStep
    )?.[0];

    if (currentStepKey) {
      const values =
        formReferences[
          currentStepKey as keyof IFormsCreditSimulationRequestRefs
        ]?.current?.values;

      console.log(values);

      setCreditSimulationRequest((prevCreditSimulationRequest) => ({
        ...prevCreditSimulationRequest,
        [currentStepKey]: values,
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
      isCurrentFormValid={isCurrentFormValid}
      setIsCurrentFormValid={setIsCurrentFormValid}
    />
  );
}

export { CreditSimulationRequest };
