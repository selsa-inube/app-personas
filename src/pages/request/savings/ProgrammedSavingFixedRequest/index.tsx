import { FormikProps } from "formik";
import { useContext, useRef, useState } from "react";
import { mapContactChannels } from "src/shared/forms/ContactChannelsForm/mappers";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { programmedSavingFixedRequestSteps } from "./config/assisted";

import { mapComments } from "@forms/CommentsForm/mappers";
import { mapDisbursement } from "@forms/DisbursementForm/mappers";
import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { mapPaymentMethod } from "@forms/PaymentMethodForm/mappers";
import { IPaymentMethodEntry } from "@forms/PaymentMethodForm/types";
import { mapSystemValidations } from "@forms/SystemValidationsForm/mappers";
import { ISystemValidationsEntry } from "@forms/SystemValidationsForm/types";
import { mapTermsAndConditions } from "@forms/TermsAndConditionsForm/mappers";
import { ITermsAndConditionsEntry } from "@forms/TermsAndConditionsForm/types";
import { Navigate } from "react-router-dom";
import { AppContext } from "src/context/app";
import { ICommentsEntry } from "../../../../shared/forms/CommentsForm/types";
import { initalValuesProgrammedSavingFixed } from "./config/initialValues";
import { IPlanNameEntry } from "./forms/PlanNameForm/types";
import { ISavingConditionsEntry } from "./forms/SavingConditionsForm/types";
import { IShareMaturityEntry } from "./forms/ShareMaturityForm/types";
import { ProgrammedSavingFixedRequestUI } from "./interface";
import {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
} from "./types";
import { programmedSavingFixedStepsRules } from "./utils";

function ProgrammedSavingFixedRequest() {
  const { user } = useContext(AppContext);
  const [currentStep, setCurrentStep] = useState(
    programmedSavingFixedRequestSteps.savingConditions.id,
  );
  const steps = Object.values(programmedSavingFixedRequestSteps);

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const { getFlag } = useContext(AppContext);

  const [programmedSavingFixedRequest, setProgrammedSavingFixedRequest] =
    useState<IFormsProgrammedSavingFixedRequest>({
      savingConditions: {
        isValid: false,
        values: initalValuesProgrammedSavingFixed.savingConditions,
      },
      paymentMethod: {
        isValid: false,
        values: mapPaymentMethod(),
      },
      shareMaturity: {
        isValid: false,
        values: initalValuesProgrammedSavingFixed.shareMaturity,
      },
      disbursement: {
        isValid: false,
        values: mapDisbursement(),
      },
      systemValidations: {
        isValid: false,
        values: mapSystemValidations(),
      },
      planName: {
        isValid: false,
        values: initalValuesProgrammedSavingFixed.planName,
      },
      comments: {
        isValid: false,
        values: mapComments(),
      },
      termsAndConditions: {
        isValid: false,
        values: mapTermsAndConditions(),
      },
      contactChannels: {
        isValid: false,
        values: mapContactChannels({
          cellPhone: parseInt(user.phone) || 0,
          email: user.email || "",
        }),
      },
    });

  const savingConditionsRef = useRef<FormikProps<ISavingConditionsEntry>>(null);
  const paymentMethodRef = useRef<FormikProps<IPaymentMethodEntry>>(null);
  const shareMaturityRef = useRef<FormikProps<IShareMaturityEntry>>(null);
  const disbursementRef = useRef<FormikProps<IDisbursementEntry>>(null);
  const systemValidationsRef =
    useRef<FormikProps<ISystemValidationsEntry>>(null);
  const planNameRef = useRef<FormikProps<IPlanNameEntry>>(null);
  const commentsRef = useRef<FormikProps<ICommentsEntry>>(null);
  const termsAndConditionsRef =
    useRef<FormikProps<ITermsAndConditionsEntry>>(null);
  const contactChannelsRef = useRef<FormikProps<IContactChannelsEntry>>(null);

  const formReferences: IFormsProgrammedSavingFixedRequestRefs = {
    savingConditions: savingConditionsRef,
    paymentMethod: paymentMethodRef,
    shareMaturity: shareMaturityRef,
    disbursement: disbursementRef,
    systemValidations: systemValidationsRef,
    planName: planNameRef,
    comments: commentsRef,
    termsAndConditions: termsAndConditionsRef,
    contactChannels: contactChannelsRef,
  };

  const handleStepChange = (stepId: number) => {
    const newProgrammedSavingFixedRequest = programmedSavingFixedStepsRules(
      currentStep,
      programmedSavingFixedRequest,
      formReferences,
      isCurrentFormValid,
    );
    setProgrammedSavingFixedRequest(newProgrammedSavingFixedRequest);

    const changeStepKey = Object.entries(
      programmedSavingFixedRequestSteps,
    ).find(([, config]) => config.id === stepId)?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;
    setIsCurrentFormValid(
      changeIsVerification ||
        newProgrammedSavingFixedRequest[
          changeStepKey as keyof IFormsProgrammedSavingFixedRequest
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

  if (!getFlag("admin.savings.savings.request-saving").value) {
    return <Navigate to="/" />;
  }

  return (
    <ProgrammedSavingFixedRequestUI
      currentStep={currentStep}
      steps={steps}
      isCurrentFormValid={isCurrentFormValid}
      programmedSavingFixedRequest={programmedSavingFixedRequest}
      formReferences={formReferences}
      handleFinishAssisted={handleFinishAssisted}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleStepChange={handleStepChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
    />
  );
}

export { ProgrammedSavingFixedRequest };
