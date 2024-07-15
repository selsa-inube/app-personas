import { usersMock } from "@mocks/users/users.mocks";
import { FormikProps } from "formik";
import { useContext, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "src/context/app";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { mapContactChannels } from "src/shared/forms/ContactChannelsForm/mappers";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { creditDestinationRequestSteps } from "./config/assisted";
import { initalValuesCreditDestination } from "./config/initialValues";
import { ICreditConditionsEntry } from "./forms/CreditConditionsForm/types";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { IDisbursementEntry } from "./forms/DisbursementForm/types";
import { IDocumentaryRequirementsEntry } from "./forms/DocumentaryRequirementsForm/types";
import { ISystemValidationsEntry } from "./forms/SystemValidationsForm/types";
import { ITermsAndConditionsEntry } from "./forms/TermsAndConditionsForm/types";
import { CreditDestinationRequestUI } from "./interface";
import {
  IFormsCreditDestinationRequest,
  IFormsCreditDestinationRequestRefs,
} from "./types";
import { creditDestinationStepsRules } from "./utils";

function CreditDestinationRequest() {
  const [currentStep, setCurrentStep] = useState(
    creditDestinationRequestSteps.destination.id,
  );
  const steps = Object.values(creditDestinationRequestSteps);

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const { getFlag } = useContext(AppContext);

  const [creditDestinationRequest, setCreditDestinationRequest] =
    useState<IFormsCreditDestinationRequest>({
      destination: {
        isValid: false,
        values: initalValuesCreditDestination.destination,
      },
      creditConditions: {
        isValid: false,
        values: initalValuesCreditDestination.creditConditions,
      },
      systemValidations: {
        isValid: true,
        values: initalValuesCreditDestination.systemValidations,
      },
      documentaryRequirements: {
        isValid: false,
        values: initalValuesCreditDestination.documentaryRequirements,
      },
      disbursement: {
        isValid: false,
        values: initalValuesCreditDestination.disbursement,
      },
      comments: {
        isValid: true,
        values: initalValuesCreditDestination.comments,
      },
      termsAndConditions: {
        isValid: false,
        values: initalValuesCreditDestination.termsAndConditions,
      },
      contactChannels: {
        isValid: false,
        values: mapContactChannels(usersMock[0].contact[0]),
      },
    });

  const destinationRef = useRef<FormikProps<IDestinationEntry>>(null);
  const creditConditionsRef = useRef<FormikProps<ICreditConditionsEntry>>(null);
  const systemValidationsRef =
    useRef<FormikProps<ISystemValidationsEntry>>(null);
  const documentaryRequirementsRef =
    useRef<FormikProps<IDocumentaryRequirementsEntry>>(null);
  const disbursementRef = useRef<FormikProps<IDisbursementEntry>>(null);
  const commentsRef = useRef<FormikProps<ICommentsEntry>>(null);
  const termsAndConditionsRef =
    useRef<FormikProps<ITermsAndConditionsEntry>>(null);
  const contactChannelsRef = useRef<FormikProps<IContactChannelsEntry>>(null);

  const formReferences: IFormsCreditDestinationRequestRefs = {
    destination: destinationRef,
    creditConditions: creditConditionsRef,
    systemValidations: systemValidationsRef,
    documentaryRequirements: documentaryRequirementsRef,
    disbursement: disbursementRef,
    comments: commentsRef,
    termsAndConditions: termsAndConditionsRef,
    contactChannels: contactChannelsRef,
  };

  const handleStepChange = (stepId: number) => {
    const newCreditDestinationRequest = creditDestinationStepsRules(
      currentStep,
      creditDestinationRequest,
      formReferences,
      isCurrentFormValid,
    );
    setCreditDestinationRequest(newCreditDestinationRequest);

    const changeStepKey = Object.entries(creditDestinationRequestSteps).find(
      ([, config]) => config.id === stepId,
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;
    setIsCurrentFormValid(
      changeIsVerification ||
        newCreditDestinationRequest[
          changeStepKey as keyof IFormsCreditDestinationRequest
        ]?.isValid ||
        false,
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };

  const handleFinishAssisted = () => {
    return true;
  };

  const handleNextStep = () => {
    if (currentStep + 1 <= steps.length) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    handleStepChange(currentStep - 1);
  };

  if (!getFlag("admin.credits.credits.request-credit").value) {
    return <Navigate to="/" />;
  }

  return (
    <CreditDestinationRequestUI
      steps={steps}
      isCurrentFormValid={isCurrentFormValid}
      creditDestinationRequest={creditDestinationRequest}
      currentStep={currentStep}
      formReferences={formReferences}
      handleFinishAssisted={handleFinishAssisted}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleStepChange={handleStepChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
    />
  );
}

export { CreditDestinationRequest };
