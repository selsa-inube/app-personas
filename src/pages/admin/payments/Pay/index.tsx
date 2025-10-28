import { mapComments } from "@forms/CommentsForm/mappers";
import { useAuth } from "@inube/auth";
import { useFlag } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { useBlocker, useNavigate } from "react-router";
import { AppContext } from "src/context/app";
import { IPayment } from "src/model/entity/payment";
import { getAccountsPayments } from "src/services/iclient/payments/getAccountsPayments";
import { getCardPayments } from "src/services/iclient/payments/getCardPayments";
import { getCommitmentPayments } from "src/services/iclient/payments/getCommitmentPayments";
import { getCreditPayments } from "src/services/iclient/payments/getCreditPayments";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { paySteps } from "./config/assisted";
import { mapObligations, mapPaymentMethod } from "./config/mappers";
import { IObligationsEntry } from "./forms/ObligationsForm/types";
import { IPaymentMethodEntry } from "./forms/PaymentMethodForm/types";
import { PayUI } from "./interface";
import { IFormsPay, IFormsPayRefs } from "./types";
import { payStepsRules, sendPaymentRequest } from "./utils";

function Pay() {
  const [currentStep, setCurrentStep] = useState(paySteps.obligations.number);
  const steps = Object.values(paySteps);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const [loadingSend, setLoadingSend] = useState(false);
  const navigate = useNavigate();
  const { getFlag } = useContext(AppContext);
  const { addFlag } = useFlag();

  const withNextValueOption = getFlag(
    "admin.payments.pay.next-value-payment",
  ).value;
  const withOtherValueOption = getFlag(
    "admin.payments.pay.other-value-payment",
  ).value;
  const withExpiredValueOption = getFlag(
    "admin.payments.pay.expired-value-payment",
  ).value;
  const withTotalValueOption = getFlag(
    "admin.payments.pay.total-value-payment",
  ).value;

  const [pay, setPay] = useState<IFormsPay>({
    obligations: {
      isValid: true,
      values: {
        paymentMethodFilters: [],
        payments: [],
        totalPayment: 0,
      },
    },
    paymentMethod: {
      isValid: true,
      values: mapPaymentMethod(),
    },
    comments: { isValid: true, values: mapComments() },
  });

  const obligationsRef = useRef<FormikProps<IObligationsEntry>>(null);
  const paymentMethodRef = useRef<FormikProps<IPaymentMethodEntry>>(null);
  const commentsRef = useRef<FormikProps<ICommentsEntry>>(null);

  const formReferences: IFormsPayRefs = {
    obligations: obligationsRef,
    paymentMethod: paymentMethodRef,
    comments: commentsRef,
  };

  const validateObligations = async () => {
    if (!accessToken || !user.identification) return;

    let newCredits: IPayment[] = [];
    let newCommitments: IPayment[] = [];
    let newCards: IPayment[] = [];
    let newAccounts: IPayment[] = [];

    newCredits = await getCreditPayments(
      user.identification,
      accessToken,
      withNextValueOption,
      withOtherValueOption,
      withExpiredValueOption,
      withTotalValueOption,
    );

    newCommitments = await getCommitmentPayments(
      user.identification,
      accessToken,
      withNextValueOption,
      withOtherValueOption,
      withExpiredValueOption,
    );

    newCards = await getCardPayments(
      user.identification,
      accessToken,
      withNextValueOption,
      withOtherValueOption,
      withExpiredValueOption,
      withTotalValueOption,
    );

    newAccounts = await getAccountsPayments(
      user.identification,
      accessToken,
      withNextValueOption,
      withOtherValueOption,
      withExpiredValueOption,
      withTotalValueOption,
    );

    setPay((prev) => ({
      ...prev,
      obligations: {
        ...prev.obligations,
        values: mapObligations(
          newCredits,
          newCommitments,
          newCards,
          newAccounts,
        ),
      },
    }));
  };

  useEffect(() => {
    validateObligations();
  }, [
    user,
    accessToken,
    withNextValueOption,
    withOtherValueOption,
    withExpiredValueOption,
    withTotalValueOption,
  ]);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname &&
      !nextLocation.search.includes("?success_request=true"),
  );

  const handleStepChange = (stepId: number) => {
    const newPay = payStepsRules(
      currentStep,
      pay,
      formReferences,
      isCurrentFormValid,
    );

    setPay(newPay);

    const changeStepKey = Object.entries(paySteps).find(
      ([, config]) => config.number === stepId,
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;
    setIsCurrentFormValid(
      changeIsVerification ||
      newPay[changeStepKey as keyof IFormsPay]?.isValid ||
      false,
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };

  const handleFinishAssisted = () => {
    if (!accessToken || !user) return;

    setLoadingSend(true);

    sendPaymentRequest(user, pay, accessToken, navigate).catch(() => {
      addFlag({
        title: "El pago no pudo ser procesado",
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

  return (
    <PayUI
      currentStep={currentStep}
      formReferences={formReferences}
      pay={pay}
      steps={steps}
      isCurrentFormValid={isCurrentFormValid}
      loadingSend={loadingSend}
      blocker={blocker}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleFinishAssisted={handleFinishAssisted}
      handleStepChange={handleStepChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
    />
  );
}

export { Pay };
