import { mapContactChannels } from "@forms/ContactChannelsForm/mappers";
import { IContactChannelsEntry } from "@forms/ContactChannelsForm/types";
import { usersMock } from "@mocks/users/users.mocks";
import { FormikProps } from "formik";
import { useRef, useState } from "react";
import {
  programmedSavingFixedRequestSteps,
  programmedSavingFixedStepsRules,
} from "./config/assisted";
import { initalValuesProgrammedSavingFixed } from "./config/initialValues";
import { IGoalEntry } from "./forms/GoalForm/types";
import { ProgrammedSavingFixedRequestUI } from "./interface";
import {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
} from "./types";
import { IQuotaEntry } from "./forms/QuotaForm/types";
import { IReimbursementEntry } from "./forms/ReimbursementForm/types";

function ProgrammedSavingFixedRequest() {
  const [currentStep, setCurrentStep] = useState(
    programmedSavingFixedRequestSteps.quota.id,
  );
  const steps = Object.values(programmedSavingFixedRequestSteps);

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const [programmedSavingFixedRequest, setProgrammedSavingFixedRequest] =
    useState<IFormsProgrammedSavingFixedRequest>({
      quota: {
        isValid: false,
        values: initalValuesProgrammedSavingFixed.quota,
      },
      goal: {
        isValid: false,
        values: initalValuesProgrammedSavingFixed.goal,
      },
      reimbursement: {
        isValid: false,
        values: initalValuesProgrammedSavingFixed.reimbursement,
      },
      contactChannels: {
        isValid: false,
        values: mapContactChannels(usersMock[0].contact[0]),
      },
    });

  const quotaRef = useRef<FormikProps<IQuotaEntry>>(null);
  const goalRef = useRef<FormikProps<IGoalEntry>>(null);
  const reimbursementRef = useRef<FormikProps<IReimbursementEntry>>(null);
  const contactChannelsRef = useRef<FormikProps<IContactChannelsEntry>>(null);

  const formReferences: IFormsProgrammedSavingFixedRequestRefs = {
    quota: quotaRef,
    goal: goalRef,
    reimbursement: reimbursementRef,
    contactChannels: contactChannelsRef,
  };

  const handleStepChange = (stepId: number) => {
    const newProgrammedSavingFixedRequest = programmedSavingFixedStepsRules(
      currentStep,
      programmedSavingFixedRequest,
      formReferences,
      isCurrentFormValid
    );
    setProgrammedSavingFixedRequest(newProgrammedSavingFixedRequest);

    const changeStepKey = Object.entries(
      programmedSavingFixedRequestSteps
    ).find(([, config]) => config.id === stepId)?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;
    setIsCurrentFormValid(
      changeIsVerification ||
        newProgrammedSavingFixedRequest[
          changeStepKey as keyof IFormsProgrammedSavingFixedRequest
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
