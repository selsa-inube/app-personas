import { mapSystemValidations } from "@forms/SystemValidationsForm/mappers";
import { ISystemValidationsEntry } from "@forms/SystemValidationsForm/types";
import { mapTermsAndConditions } from "@forms/TermsAndConditionsForm/mappers";
import { ITermsAndConditionsEntry } from "@forms/TermsAndConditionsForm/types";
import { useAuth } from "@inube/auth";
import { useFlag } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useBlocker, useNavigate } from "react-router";
import { AppContext } from "src/context/app";
import { registerInEventSteps } from "./config/assisted";
import { initalValuesRegisterInEvent } from "./config/initialValues";
import { IChooseEntriesEntry } from "./forms/ChooseEntriesForm/types";
import { ILiquidationEntry } from "./forms/LiquidationForm/types";
import { IPaymentMethodEntry } from "./forms/PaymentMethodForm/types";
import { RegisterInEventUI } from "./interface";
import { IFormsRegisterInEvent, IFormsRegisterInEventRefs } from "./types";
import { registerInEventStepsRules, sendCreditRequest } from "./utils";

function RegisterInEvent() {
  const { accessToken } = useAuth();
  const { user, serviceDomains, loadServiceDomains } = useContext(AppContext);
  const [loadingSend, setLoadingSend] = useState(false);

  const [currentStep, setCurrentStep] = useState(
    registerInEventSteps.chooseEntries.number,
  );
  const [redirectModal, setRedirectModal] = useState(false);
  const steps = Object.values(registerInEventSteps);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const { getFlag } = useContext(AppContext);
  const navigate = useNavigate();
  const { addFlag } = useFlag();

  const [registerInEvent, setRegisterInEvent] = useState<IFormsRegisterInEvent>(
    {
      chooseEntries: {
        isValid: false,
        values: initalValuesRegisterInEvent.chooseEntries,
      },
      liquidation: {
        isValid: true,
        values: initalValuesRegisterInEvent.liquidation,
      },
      paymentMethod: {
        isValid: false,
        values: initalValuesRegisterInEvent.paymentMethod,
      },
      systemValidations: {
        isValid: false,
        values: mapSystemValidations(),
      },
      termsAndConditions: {
        isValid: false,
        values: mapTermsAndConditions(),
      },
    },
  );

  const chooseEntriesRef = useRef<FormikProps<IChooseEntriesEntry>>(null);
  const liquidationRef = useRef<FormikProps<ILiquidationEntry>>(null);
  const paymentMethodRef = useRef<FormikProps<IPaymentMethodEntry>>(null);
  const systemValidationsRef =
    useRef<FormikProps<ISystemValidationsEntry>>(null);
  const termsAndConditionsRef =
    useRef<FormikProps<ITermsAndConditionsEntry>>(null);

  const formReferences: IFormsRegisterInEventRefs = {
    chooseEntries: chooseEntriesRef,
    liquidation: liquidationRef,
    paymentMethod: paymentMethodRef,
    systemValidations: systemValidationsRef,
    termsAndConditions: termsAndConditionsRef,
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
      serviceDomains.identificationtype.length > 0 &&
      serviceDomains.relationshiptheowner.length > 0
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

  const handleStepChange = (stepId: number) => {
    const newRegisterInEvent = registerInEventStepsRules(
      currentStep,
      registerInEvent,
      formReferences,
      isCurrentFormValid,
    );

    setRegisterInEvent(newRegisterInEvent);

    const changeStepKey = Object.entries(registerInEventSteps).find(
      ([, config]) => config.number === stepId,
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;
    setIsCurrentFormValid(
      changeIsVerification ||
        newRegisterInEvent[changeStepKey as keyof IFormsRegisterInEvent]
          ?.isValid ||
        false,
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };

  const handleFinishAssisted = () => {
    if (!accessToken || !user) return;

    setLoadingSend(true);

    sendCreditRequest(user, registerInEvent, accessToken)
      .then(() => {
        setLoadingSend(false);
        setRedirectModal(true);
      })
      .catch(() => {
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

  const handleLeaveRequest = async () => {
    blocker.state === "blocked" && blocker.proceed();
  };

  const handleRedirectToHome = () => {
    navigate("/?success_request=true");
  };

  const handleRedirectToRequests = () => {
    navigate("/my-entries?success_request=true");
  };

  if (!getFlag("admin.credits.credits.request-credit").value) {
    return <Navigate to="/" />;
  }

  return (
    <RegisterInEventUI
      steps={steps}
      isCurrentFormValid={isCurrentFormValid}
      registerInEvent={registerInEvent}
      currentStep={currentStep}
      formReferences={formReferences}
      loadingSend={loadingSend}
      blocker={blocker}
      redirectModal={redirectModal}
      onFinishAssisted={handleFinishAssisted}
      onNextStep={handleNextStep}
      onPreviousStep={handlePreviousStep}
      onStepChange={handleStepChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
      onLeaveRequest={handleLeaveRequest}
      onRedirectToHome={handleRedirectToHome}
      onRedirectToRequests={handleRedirectToRequests}
    />
  );
}

export { RegisterInEvent };
