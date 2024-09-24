import { useAuth } from "@inube/auth";
import { FormikProps } from "formik";
import { useContext, useRef, useState } from "react";
import { Navigate, useBlocker, useParams } from "react-router-dom";
import { aidRequestTypeDM } from "src/model/domains/services/aids/aidRequestTypeDM";
import { aidRequestSteps } from "./config/assisted";
import { mapBeneficiaries, mapDetailsSituation } from "./config/mappers";
import { IBeneficiariesEntry } from "./forms/BeneficiariesForm/types";
import { IDetailsSituationEntry } from "./forms/DetailsSituationForm/types";

import { mapContactChannels } from "@forms/ContactChannelsForm/mappers";
import { IContactChannelsEntry } from "@forms/ContactChannelsForm/types";
import { mapDisbursement } from "@forms/DisbursementForm/mappers";
import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { mapDocumentaryRequirements } from "@forms/DocumentaryRequirementsForm/mappers";
import { IDocumentaryRequirementsEntry } from "@forms/DocumentaryRequirementsForm/types";
import { mapSystemValidations } from "@forms/SystemValidationsForm/mappers";
import { ISystemValidationsEntry } from "@forms/SystemValidationsForm/types";
import { mapTermsAndConditions } from "@forms/TermsAndConditionsForm/mappers";
import { ITermsAndConditionsEntry } from "@forms/TermsAndConditionsForm/types";
import { AppContext } from "src/context/app";
import { AidRequestUI } from "./interface";
import { IFormsAidRequest, IFormsAidRequestRefs } from "./types";
import { aidRequestStepsRules } from "./utils";

function AidRequest() {
  const { aid_type } = useParams();
  const { user } = useContext(AppContext);
  const [currentStep, setCurrentStep] = useState(
    aidRequestSteps.beneficiaries.number,
  );
  const steps = Object.values(aidRequestSteps);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);
  const { accessToken } = useAuth();
  const [loadingSend, setLoadingSend] = useState(false);

  const aidRequestType = aid_type
    ? aidRequestTypeDM.valueOf(aid_type)
    : undefined;

  const [aidRequest, setAidRequest] = useState<IFormsAidRequest>({
    beneficiaries: {
      isValid: true,
      values: mapBeneficiaries(),
    },
    detailsSituation: {
      isValid: true,
      values: mapDetailsSituation(),
    },
    systemValidations: {
      isValid: true,
      values: mapSystemValidations(),
    },
    documentaryRequirements: {
      isValid: true,
      values: mapDocumentaryRequirements(),
    },
    disbursement: {
      isValid: false,
      values: mapDisbursement(),
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

  const beneficiariesRef = useRef<FormikProps<IBeneficiariesEntry>>(null);
  const detailsSituationRef = useRef<FormikProps<IDetailsSituationEntry>>(null);
  const systemValidationsRef =
    useRef<FormikProps<ISystemValidationsEntry>>(null);
  const documentaryRequirementsRef =
    useRef<FormikProps<IDocumentaryRequirementsEntry>>(null);
  const disbursementRef = useRef<FormikProps<IDisbursementEntry>>(null);
  const termsAndConditionsRef =
    useRef<FormikProps<ITermsAndConditionsEntry>>(null);
  const contactChannelsRef = useRef<FormikProps<IContactChannelsEntry>>(null);

  const formReferences: IFormsAidRequestRefs = {
    beneficiaries: beneficiariesRef,
    detailsSituation: detailsSituationRef,
    systemValidations: systemValidationsRef,
    documentaryRequirements: documentaryRequirementsRef,
    disbursement: disbursementRef,
    termsAndConditions: termsAndConditionsRef,
    contactChannels: contactChannelsRef,
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
      ([, config]) => config.number === stepId,
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
    if (currentStep < steps.length) {
      handleStepChange(currentStep + 1);
      return;
    }
    handleFinishAssisted();
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      handleStepChange(currentStep - 1);
    }
  };

  return (
    <AidRequestUI
      currentStep={currentStep}
      formReferences={formReferences}
      aidRequest={aidRequest}
      steps={steps}
      isCurrentFormValid={isCurrentFormValid}
      loadingSend={loadingSend}
      blocker={blocker}
      aidType={aidRequestType}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleFinishAssisted={handleFinishAssisted}
      handleStepChange={handleStepChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
    />
  );
}

export { AidRequest };
