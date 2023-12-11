import { usersMock } from "@mocks/users/users.mocks";
import { FormikProps } from "formik";
import { useRef, useState } from "react";
import {
  creditSimulationRequestSteps,
  creditSimulationStepsRules,
} from "./config/assisted";
import { initalValuesCreditSimulation } from "./config/initialValues";
import { mapCommunicationChannels } from "./config/mappers";
import { ICommentsEntry } from "./forms/CommentsForm/types";
import { ICommunicationChannelsEntry } from "./forms/CommunicationChannelsForm/types";
import { ICreditConditionsEntry } from "./forms/CreditConditionsForm/types";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { IDisbursementEntry } from "./forms/DisbursementForm/types";
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
      creditConditions: {
        isValid: false,
        values: initalValuesCreditSimulation.creditConditions,
      },
      preliquidation: {
        isValid: true,
        values: initalValuesCreditSimulation.preliquidation,
      },
      disbursement: {
        isValid: false,
        values: initalValuesCreditSimulation.disbursement,
      },
      comments: {
        isValid: true,
        values: initalValuesCreditSimulation.comments,
      },
      termsAndConditions: {
        isValid: false,
        values: initalValuesCreditSimulation.termsAndConditions,
      },
      communicationChannels: {
        isValid: false,
        values: mapCommunicationChannels(usersMock[0].contact[0]),
      },
    });

  const destinationRef = useRef<FormikProps<IDestinationEntry>>(null);
  const creditConditionsRef = useRef<FormikProps<ICreditConditionsEntry>>(null);
  const preliquidationRef = useRef<FormikProps<IPreliquidationEntry>>(null);
  const disbursementRef = useRef<FormikProps<IDisbursementEntry>>(null);
  const commentsRef = useRef<FormikProps<ICommentsEntry>>(null);
  const termsAndConditionsRef =
    useRef<FormikProps<ITermsAndConditionsEntry>>(null);
  const communicationChannelsRef =
    useRef<FormikProps<ICommunicationChannelsEntry>>(null);

  const formReferences: IFormsCreditSimulationRequestRefs = {
    destination: destinationRef,
    creditConditions: creditConditionsRef,
    preliquidation: preliquidationRef,
    disbursement: disbursementRef,
    comments: commentsRef,
    termsAndConditions: termsAndConditionsRef,
    communicationChannels: communicationChannelsRef,
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

    const changeIsVerification = stepId === steps.length;
    setIsCurrentFormValid(
      changeIsVerification ||
        newCreditSimulationRequest[
          changeStepKey as keyof IFormsCreditSimulationRequest
        ]?.isValid ||
        false
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
