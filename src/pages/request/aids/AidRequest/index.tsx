import { useAuth } from "@inube/auth";
import { IMessage } from "@ptypes/messages.types";
import { FormikProps } from "formik";
import { useRef, useState } from "react";
import { Navigate, useBlocker, useParams } from "react-router-dom";
import { aidRequestTypeDM } from "src/model/domains/services/aids/aidRequestTypeDM";
import { initialMessageState } from "src/utils/messages";
import { aidRequestSteps } from "./config/assisted";
import {
  mapAmount,
  mapBeneficiaries,
  mapDetailsSituation,
  mapDisbursement,
  mapDocumentaryRequirements,
  mapRegulationValidations,
} from "./config/mappers";
import { IAmountEntry } from "./forms/AmountForm/types";
import { IBeneficiariesEntry } from "./forms/BeneficiariesForm/types";
import { IDetailsSituationEntry } from "./forms/DetailsSituationForm/types";

import { IDocumentaryRequirementsEntry } from "./forms/DocumentaryRequirementsForm/types";
import { IRegulationValidationsEntry } from "./forms/RegulationValidationsForm/types";
import { AidRequestUI } from "./interface";
import { IFormsAidRequest, IFormsAidRequestRefs } from "./types";
import { aidRequestStepsRules } from "./utils";
import { IDisbursementEntry } from "@forms/DisbursementForm/types";

function AidRequest() {
  const { aid_type } = useParams();

  const [currentStep, setCurrentStep] = useState(
    aidRequestSteps.beneficiaries.id,
  );
  const steps = Object.values(aidRequestSteps);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);
  const { user, accessToken } = useAuth();
  const [loadingSend, setLoadingSend] = useState(false);
  const [message, setMessage] = useState<IMessage>(initialMessageState);

  const aidRequestType = aid_type
    ? aidRequestTypeDM.valueOf(aid_type)
    : undefined;

  const [aidRequest, setAidRequest] = useState<IFormsAidRequest>({
    beneficiaries: {
      isValid: true,
      values: mapBeneficiaries(),
    },
    amount: {
      isValid: true,
      values: mapAmount(),
    },
    detailsSituation: {
      isValid: true,
      values: mapDetailsSituation(),
    },
    regulationValidations: {
      isValid: true,
      values: mapRegulationValidations(aidRequestType),
    },
    documentaryRequirements: {
      isValid: true,
      values: mapDocumentaryRequirements(aidRequestType),
    },
    disbursement: {
      isValid: true,
      values: mapDisbursement(),
    },
  });

  const beneficiariesRef = useRef<FormikProps<IBeneficiariesEntry>>(null);
  const amountRef = useRef<FormikProps<IAmountEntry>>(null);
  const detailsSituationRef = useRef<FormikProps<IDetailsSituationEntry>>(null);
  const regulationValidationsRef =
    useRef<FormikProps<IRegulationValidationsEntry>>(null);
  const documentaryRequirementsRef =
    useRef<FormikProps<IDocumentaryRequirementsEntry>>(null);
  const disbursementRef = useRef<FormikProps<IDisbursementEntry>>(null);

  const formReferences: IFormsAidRequestRefs = {
    beneficiaries: beneficiariesRef,
    amount: amountRef,
    detailsSituation: detailsSituationRef,
    regulationValidations: regulationValidationsRef,
    documentaryRequirements: documentaryRequirementsRef,
    disbursement: disbursementRef,
  };

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname,
  );

  if (!aid_type || !aidRequestType) {
    return <Navigate to="/aids" />;
  }

  const handleStepChange = (stepId: number) => {
    const newAidRequest = aidRequestStepsRules(
      currentStep,
      aidRequest,
      formReferences,
      isCurrentFormValid,
    );

    setAidRequest(newAidRequest);

    const changeStepKey = Object.entries(aidRequestSteps).find(
      ([, config]) => config.id === stepId,
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;
    setIsCurrentFormValid(
      changeIsVerification ||
        newAidRequest[changeStepKey as keyof IFormsAidRequest]?.isValid ||
        false,
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };

  const handleFinishAssisted = () => {
    if (!accessToken || !user) return;

    setLoadingSend(true);
  };

  const handleNextStep = () => {
    if (currentStep + 1 <= steps.length) {
      handleStepChange(currentStep + 1);
      return;
    }
    handleFinishAssisted();
  };

  const handlePreviousStep = () => {
    handleStepChange(currentStep - 1);
  };

  const handleCloseMessage = () => {
    setMessage(initialMessageState);
  };

  return (
    <AidRequestUI
      currentStep={currentStep}
      formReferences={formReferences}
      aidRequest={aidRequest}
      steps={steps}
      isCurrentFormValid={isCurrentFormValid}
      loadingSend={loadingSend}
      message={message}
      blocker={blocker}
      aidType={aidRequestType}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleFinishAssisted={handleFinishAssisted}
      handleStepChange={handleStepChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
      handleCloseMessage={handleCloseMessage}
    />
  );
}

export { AidRequest };
