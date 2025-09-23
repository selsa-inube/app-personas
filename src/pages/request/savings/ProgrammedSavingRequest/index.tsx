import { FormikProps } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { mapContactChannels } from "src/shared/forms/ContactChannelsForm/mappers";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { programmedSavingRequestSteps } from "./config/assisted";

import { initialValuesActionExpiration } from "@forms/ActionExpirationForm/initialValues";
import { IActionExpirationEntry } from "@forms/ActionExpirationForm/types";
import { mapDisbursement } from "@forms/DisbursementForm/mappers";
import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { mapPaymentMethod } from "@forms/PaymentMethodForm/mappers";
import { IPaymentMethodEntry } from "@forms/PaymentMethodForm/types";
import { mapSystemValidations } from "@forms/SystemValidationsForm/mappers";
import { ISystemValidationsEntry } from "@forms/SystemValidationsForm/types";
import { mapTermsAndConditions } from "@forms/TermsAndConditionsForm/mappers";
import { ITermsAndConditionsEntry } from "@forms/TermsAndConditionsForm/types";
import { useAuth } from "@inube/auth";
import { useFlag } from "@inubekit/inubekit";
import { Navigate, useBlocker, useNavigate } from "react-router";
import { AppContext } from "src/context/app";
import { captureNewError } from "src/services/errors/handleErrors";
import { initalValuesProgrammedSaving } from "./config/initialValues";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { ISavingConditionsEntry } from "./forms/SavingConditionsForm/types";
import { ProgrammedSavingRequestUI } from "./interface";
import {
  IFormsProgrammedSavingRequest,
  IFormsProgrammedSavingRequestRefs,
} from "./types";
import {
  programmedSavingStepsRules,
  sendProgrammedSavingRequest,
} from "./utils";

function ProgrammedSavingRequest() {
  const { user, serviceDomains, loadServiceDomains } = useContext(AppContext);
  const { accessToken } = useAuth();
  const [currentStep, setCurrentStep] = useState(
    programmedSavingRequestSteps.destination.number,
  );
  const [redirectModal, setRedirectModal] = useState(false);
  const steps = Object.values(programmedSavingRequestSteps);

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const { getFlag } = useContext(AppContext);
  const [loadingSend, setLoadingSend] = useState(false);
  const navigate = useNavigate();
  const { addFlag } = useFlag();

  const [programmedSavingRequest, setProgrammedSavingRequest] =
    useState<IFormsProgrammedSavingRequest>({
      destination: {
        isValid: false,
        values: initalValuesProgrammedSaving.destination,
      },
      savingConditions: {
        isValid: false,
        values: initalValuesProgrammedSaving.savingConditions,
      },
      paymentMethod: {
        isValid: false,
        values: mapPaymentMethod(),
      },
      actionExpiration: {
        isValid: false,
        values: initialValuesActionExpiration,
      },
      disbursement: {
        isValid: false,
        values: mapDisbursement(),
      },
      systemValidations: {
        isValid: false,
        values: mapSystemValidations(),
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

  const destinationRef = useRef<FormikProps<IDestinationEntry>>(null);
  const savingConditionsRef = useRef<FormikProps<ISavingConditionsEntry>>(null);
  const paymentMethodRef = useRef<FormikProps<IPaymentMethodEntry>>(null);
  const actionExpirationRef = useRef<FormikProps<IActionExpirationEntry>>(null);
  const disbursementRef = useRef<FormikProps<IDisbursementEntry>>(null);
  const systemValidationsRef =
    useRef<FormikProps<ISystemValidationsEntry>>(null);
  const termsAndConditionsRef =
    useRef<FormikProps<ITermsAndConditionsEntry>>(null);
  const contactChannelsRef = useRef<FormikProps<IContactChannelsEntry>>(null);

  const formReferences: IFormsProgrammedSavingRequestRefs = {
    destination: destinationRef,
    savingConditions: savingConditionsRef,
    paymentMethod: paymentMethodRef,
    actionExpiration: actionExpirationRef,
    disbursement: disbursementRef,
    systemValidations: systemValidationsRef,
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

    loadServiceDomains(["integratedbanks", "identificationtype"], accessToken);
  };

  useEffect(() => {
    validateEnums();
  }, [accessToken]);

  const handleStepChange = (stepId: number) => {
    const newProgrammedSavingRequest = programmedSavingStepsRules(
      currentStep,
      programmedSavingRequest,
      formReferences,
      isCurrentFormValid,
    );

    setProgrammedSavingRequest(newProgrammedSavingRequest);

    const changeStepKey = Object.entries(programmedSavingRequestSteps).find(
      ([, config]) => config.number === stepId,
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;
    setIsCurrentFormValid(
      changeIsVerification ||
        newProgrammedSavingRequest[
          changeStepKey as keyof IFormsProgrammedSavingRequest
        ]?.isValid ||
        false,
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };

  const handleFinishAssisted = () => {
    if (!accessToken || !user) return;

    setLoadingSend(true);

    sendProgrammedSavingRequest(user, programmedSavingRequest, accessToken)
      .then(() => {
        setLoadingSend(false);
        setRedirectModal(true);
      })
      .catch((error) => {
        captureNewError(
          error,
          {
            inFunction: "handleFinishAssisted",
            action: "sendProgrammedSavingRequest",
            screen: "ProgrammedSavingRequest",
            file: "src/pages/request/savings/ProgrammedSavingRequest/index.tsx",
          },
          { feature: "request-programmed-saving" },
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

  if (!getFlag("admin.savings.savings.request-saving").value) {
    return <Navigate to="/" />;
  }

  return (
    <ProgrammedSavingRequestUI
      currentStep={currentStep}
      steps={steps}
      isCurrentFormValid={isCurrentFormValid}
      programmedSavingRequest={programmedSavingRequest}
      formReferences={formReferences}
      loadingSend={loadingSend}
      blocker={blocker}
      redirectModal={redirectModal}
      onFinishAssisted={handleFinishAssisted}
      onNextStep={handleNextStep}
      onPreviousStep={handlePreviousStep}
      onStepChange={handleStepChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
      onRedirectToHome={handleRedirectToHome}
      onRedirectToRequests={handleRedirectToRequests}
    />
  );
}

export { ProgrammedSavingRequest };
