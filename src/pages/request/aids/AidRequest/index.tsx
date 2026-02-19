import { useAuth } from "@inube/auth";
import { FormikProps } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Navigate,
  useBlocker,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import { aidRequestSteps } from "./config/assisted";
import {
  mapBeneficiaries,
  mapDetailsSituation,
  mapEvaluateAmounts,
} from "./config/mappers";
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
import { IOption, useFlag } from "@inubekit/inubekit";
import { AppContext } from "src/context/app";
import { captureNewError } from "src/services/errors/handleErrors";
import { removeDocument } from "src/services/iclient/documents/removeDocument";
import { IEvaluateAmountsEntry } from "./forms/EvaluateAmountsForm/types";
import { AidRequestUI } from "./interface";
import { IFormsAidRequest, IFormsAidRequestRefs } from "./types";
import { aidRequestStepsRules, sendAidRequest } from "./utils";

function AidRequest() {
  const { aid_id } = useParams();
  const { user, serviceDomains, loadServiceDomains } = useContext(AppContext);
  const [currentStep, setCurrentStep] = useState(
    aidRequestSteps.beneficiaries.number,
  );
  const steps = Object.values(aidRequestSteps);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);
  const { accessToken } = useAuth();
  const [loadingSend, setLoadingSend] = useState(false);
  const [redirectModal, setRedirectModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { addFlag } = useFlag();

  const aidRequestType: IOption = {
    id: location.state?.id || "",
    value: location.state?.id || "",
    label: location.state?.title || "",
  };

  const [aidRequest, setAidRequest] = useState<IFormsAidRequest>({
    beneficiaries: {
      isValid: true,
      values: mapBeneficiaries(),
    },
    evaluateAmounts: {
      isValid: true,
      values: mapEvaluateAmounts(),
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
      values: mapContactChannels(user),
    },
  });

  const beneficiariesRef = useRef<FormikProps<IBeneficiariesEntry>>(null);
  const evaluateAmountsRef = useRef<FormikProps<IEvaluateAmountsEntry>>(null);
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
    evaluateAmounts: evaluateAmountsRef,
    detailsSituation: detailsSituationRef,
    systemValidations: systemValidationsRef,
    documentaryRequirements: documentaryRequirementsRef,
    disbursement: disbursementRef,
    termsAndConditions: termsAndConditionsRef,
    contactChannels: contactChannelsRef,
  };

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname &&
      !nextLocation.search.includes("?success_request=true"),
  );

  const validateEnums = async () => {
    if (!accessToken) return;

    if (
      serviceDomains.integratedbanks.length > 0 &&
      serviceDomains.identificationtype.length > 0
    )
      return;

    loadServiceDomains(
      ["integratedbanks", "identificationtype", "relationshiptheowner"],
      accessToken,
    );
  };

  useEffect(() => {
    validateEnums();
  }, [accessToken]);

  if (!aid_id || !aidRequestType) {
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

    sendAidRequest(user, aidRequest, accessToken)
      .then(() => {
        setLoadingSend(false);
        setRedirectModal(true);
      })
      .catch((error) => {
        captureNewError(
          error,
          {
            inFunction: "handleFinishAssisted",
            action: "sendAidRequest",
            screen: "AidRequest",
            file: "src/pages/request/aids/AidRequest/index.tsx",
          },
          { feature: "request-aid" },
        );

        addFlag({
          title: "La solicitud no pudo ser procesada",
          description:
            "Ya fuimos notificados y estamos revisando. Intenta de nuevo más tarde.",
          appearance: "danger",
          duration: 5000,
        });

        setLoadingSend(false);
      });
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

  const handleRedirectToHome = () => {
    navigate("/?success_request=true");
  };

  const handleRedirectToRequests = () => {
    navigate("/my-requests?success_request=true");
  };

  const handleLeaveRequest = async () => {
    for (const file of aidRequest.documentaryRequirements.values
      .selectedDocuments) {
      if (!accessToken || !file.documentType || !file.sequence) return;

      try {
        await removeDocument(
          {
            documentType: file.documentType,
            sequence: file.sequence,
            customerCode: user.identification,
          },
          accessToken,
        );
      } catch (error) {
        captureNewError(
          error,
          {
            inFunction: "handleLeaveRequest",
            action: "removeDocument",
            screen: "AidRequest",
            file: "src/pages/request/aids/AidRequest/index.tsx",
          },
          { feature: "request-aid" },
        );
      }
    }

    blocker.state === "blocked" && blocker.proceed();
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
      redirectModal={redirectModal}
      aidType={aidRequestType}
      onNextStep={handleNextStep}
      onPreviousStep={handlePreviousStep}
      onFinishAssisted={handleFinishAssisted}
      onStepChange={handleStepChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
      onRedirectToHome={handleRedirectToHome}
      onRedirectToRequests={handleRedirectToRequests}
      onLeaveRequest={handleLeaveRequest}
    />
  );
}

export { AidRequest };
