import { initialValuesActionExpiration } from "@forms/ActionExpirationForm/initialValues";
import { IActionExpirationEntry } from "@forms/ActionExpirationForm/types";
import { mapDisbursement } from "@forms/DisbursementForm/mappers";
import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { mapSystemValidations } from "@forms/SystemValidationsForm/mappers";
import { ISystemValidationsEntry } from "@forms/SystemValidationsForm/types";
import { mapTermsAndConditions } from "@forms/TermsAndConditionsForm/mappers";
import { ITermsAndConditionsEntry } from "@forms/TermsAndConditionsForm/types";
import { useAuth } from "@inube/auth";
import { useFlag } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useBlocker, useNavigate } from "react-router-dom";
import { AppContext } from "src/context/app";
import { captureNewError } from "src/services/errors/handleErrors";
import { mapContactChannels } from "src/shared/forms/ContactChannelsForm/mappers";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { cdatRequestSteps } from "./config/assisted";
import { initalValuesCDAT } from "./config/initialValues";
import { IDeadlineEntry } from "./forms/DeadlineForm/types";
import { initialValuesInterestPayment } from "./forms/InterestPaymentForm/initialValues";
import { IInterestPaymentEntry } from "./forms/InterestPaymentForm/types";
import { IInvestmentEntry } from "./forms/InvestmentForm/types";
import { IPaymentMethodEntry } from "./forms/PaymentMethodForm/types";
import { CdatRequestUI } from "./interface";
import { IFormsCdatRequest, IFormsCdatRequestRefs } from "./types";
import { cdatStepsRules, sendCdatRequest } from "./utils";

function CdatRequest() {
  const { user, serviceDomains, loadServiceDomains } = useContext(AppContext);
  const { accessToken } = useAuth();
  const [loadingSend, setLoadingSend] = useState(false);
  const [redirectModal, setRedirectModal] = useState(false);

  const [currentStep, setCurrentStep] = useState(
    cdatRequestSteps.investment.number,
  );
  const steps = Object.values(cdatRequestSteps);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const { getFlag } = useContext(AppContext);

  const navigate = useNavigate();
  const { addFlag } = useFlag();

  const [cdatRequest, setCdatRequest] = useState<IFormsCdatRequest>({
    investment: {
      isValid: false,
      values: {},
    },
    deadline: {
      isValid: false,
      values: initalValuesCDAT.deadline,
    },
    interestPayment: {
      isValid: false,
      values: initialValuesInterestPayment,
    },
    paymentMethod: {
      isValid: false,
      values: initalValuesCDAT.paymentMethod,
    },
    disbursement: {
      isValid: false,
      values: mapDisbursement(),
    },
    actionExpiration: {
      isValid: false,
      values: initialValuesActionExpiration,
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

  const investmentRef = useRef<FormikProps<IInvestmentEntry>>(null);
  const deadlineRef = useRef<FormikProps<IDeadlineEntry>>(null);
  const interestPaymentRef = useRef<FormikProps<IInterestPaymentEntry>>(null);
  const paymentMethodRef = useRef<FormikProps<IPaymentMethodEntry>>(null);
  const disbursementRef = useRef<FormikProps<IDisbursementEntry>>(null);
  const actionExpirationRef = useRef<FormikProps<IActionExpirationEntry>>(null);
  const systemValidationsRef =
    useRef<FormikProps<ISystemValidationsEntry>>(null);
  const termsAndConditionsRef =
    useRef<FormikProps<ITermsAndConditionsEntry>>(null);
  const contactChannelsRef = useRef<FormikProps<IContactChannelsEntry>>(null);

  const formReferences: IFormsCdatRequestRefs = {
    investment: investmentRef,
    deadline: deadlineRef,
    interestPayment: interestPaymentRef,
    paymentMethod: paymentMethodRef,
    disbursement: disbursementRef,
    actionExpiration: actionExpirationRef,
    systemValidations: systemValidationsRef,
    termsAndConditions: termsAndConditionsRef,
    contactChannels: contactChannelsRef,
  };

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname &&
      !nextLocation.search.includes("?success_request=true") &&
      nextLocation.pathname !== "/",
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
    const newCdatRequest = cdatStepsRules(
      currentStep,
      cdatRequest,
      formReferences,
      isCurrentFormValid,
    );

    setCdatRequest(newCdatRequest);

    const changeStepKey = Object.entries(cdatRequestSteps).find(
      ([, config]) => config.number === stepId,
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;
    setIsCurrentFormValid(
      changeIsVerification ||
        newCdatRequest[changeStepKey as keyof IFormsCdatRequest]?.isValid ||
        false,
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };

  const handleFinishAssisted = () => {
    if (!accessToken || !user) return;

    setLoadingSend(true);

    sendCdatRequest(user, cdatRequest, accessToken)
      .then(() => {
        setLoadingSend(false);
        setRedirectModal(true);
      })
      .catch((error) => {
        captureNewError(
          error,
          {
            inFunction: "handleFinishAssisted",
            action: "sendCdatRequest",
            screen: "CdatRequest",
            file: "src/pages/request/savings/CdatRequest/index.tsx",
          },
          {
            feature: "request-cdat",
          },
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

  if (!getFlag("admin.savings.savings.request-saving").value) {
    return <Navigate to="/" />;
  }

  const handleRedirectToHome = () => {
    navigate("/?success_request=true");
  };

  const handleRedirectToRequests = () => {
    navigate("/my-requests?success_request=true");
  };

  return (
    <CdatRequestUI
      currentStep={currentStep}
      steps={steps}
      isCurrentFormValid={isCurrentFormValid}
      cdatRequest={cdatRequest}
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

export { CdatRequest };
