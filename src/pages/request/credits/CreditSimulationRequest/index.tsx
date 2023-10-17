import { FormikProps } from "formik";
import { useRef, useState } from "react";
import {
  creditSimulationRequestSteps,
  creditSimulationStepsRules,
} from "./config/assisted";
import { initalValuesCreditSimulation } from "./config/initialValues";
import { ICommentsEntry } from "./forms/CommentsForm/types";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { ISimulationEntry } from "./forms/SimulationForm/types";
import { IPreliquidationEntry } from "./forms/PreliquidationForm/types";
import { ITermsAndConditionsEntry } from "./forms/TermsAndConditionsForm/types";
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

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const [creditSimulationRequest, setCreditSimulationRequest] =
    useState<IFormsCreditSimulationRequest>({
      destination: {
        isValid: false,
        values: initalValuesCreditSimulation.destination,
      },
      simulation: {
        isValid: false,
        values: initalValuesCreditSimulation.simulation,
      },
      preliquidation: {
        isValid: true,
        values: initalValuesCreditSimulation.preliquidation,
      },
      comments: {
        isValid: false,
        values: initalValuesCreditSimulation.comments,
      },
      termsAndConditions: {
        isValid: false,
        values: initalValuesCreditSimulation.termsAndConditions,
      },
    });

  const destinationRef = useRef<FormikProps<IDestinationEntry>>(null);
  const simulationRef = useRef<FormikProps<ISimulationEntry>>(null);
  const preliquidationRef = useRef<FormikProps<IPreliquidationEntry>>(null);
  const commentsRef = useRef<FormikProps<ICommentsEntry>>(null);
  const termsAndConditionsRef =
    useRef<FormikProps<ITermsAndConditionsEntry>>(null);

  const formReferences: IFormsCreditSimulationRequestRefs = {
    destination: destinationRef,
    simulation: simulationRef,
    preliquidation: preliquidationRef,
    comments: commentsRef,
    termsAndConditions: termsAndConditionsRef,
  };

  const handleStepChange = (stepId: number) => {
    const newCreditSimulationRequest = creditSimulationStepsRules(
      currentStep,
      creditSimulationRequest,
      formReferences,
      isCurrentFormValid
    );
    setCreditSimulationRequest(newCreditSimulationRequest);

    const changeStepKey = Object.entries(creditSimulationRequestSteps).find(
      ([, config]) => config.id === stepId
    )?.[0];

    if (!changeStepKey) return;

    setIsCurrentFormValid(
      newCreditSimulationRequest[
        changeStepKey as keyof IFormsCreditSimulationRequest
      ]?.isValid || false
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
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
