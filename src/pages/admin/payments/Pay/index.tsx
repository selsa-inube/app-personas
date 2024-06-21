import { useAuth } from "@inube/auth";
import { mapComments } from "@pages/general/UpdateData/config/mappers";
import { IMessage } from "@ptypes/messages.types";
import { FormikProps } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { MdSentimentNeutral } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AppContext } from "src/context/app";
import { CreditsContext } from "src/context/credits";
import { SavingsContext } from "src/context/savings";
import { getCreditsForUser } from "src/services/iclient/credits/getCredits";
import { getSavingsCommitmentsForUser } from "src/services/iclient/savings/getCommitments";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { initialMessageState } from "src/utils/messages";
import { paySteps } from "./config/assisted";
import { mapObligations, mapPaymentMethod } from "./config/mappers";
import { IObligationsEntry } from "./forms/ObligationsForm/types";
import { IPaymentMethodEntry } from "./forms/PaymentMethodForm/types";
import { PayUI } from "./interface";
import { IFormsPay, IFormsPayRefs } from "./types";
import { payStepsRules, sendPaymentRequest } from "./utils";

function Pay() {
  const [currentStep, setCurrentStep] = useState(paySteps.obligations.id);
  const steps = Object.values(paySteps);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const { credits } = useContext(CreditsContext);
  const { commitments } = useContext(SavingsContext);
  const [loadingSend, setLoadingSend] = useState(false);
  const [message, setMessage] = useState<IMessage>(initialMessageState);
  const navigate = useNavigate();
  const { getFlag } = useContext(AppContext);

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
      values: mapObligations(
        credits,
        commitments,
        withNextValueOption,
        withOtherValueOption,
        withExpiredValueOption,
        withTotalValueOption,
      ),
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
    if (!accessToken) return;

    let newCredits = credits;
    let newCommitments = commitments;

    if (credits.length === 0) {
      newCredits = await getCreditsForUser(user.identification, accessToken);
    }

    if (commitments.length === 0) {
      newCommitments = await getSavingsCommitmentsForUser(
        user.identification,
        accessToken,
      );
    }

    setPay((prev) => ({
      ...prev,
      obligations: {
        ...prev.obligations,
        values: mapObligations(
          newCredits,
          newCommitments,
          withNextValueOption,
          withOtherValueOption,
          withExpiredValueOption,
          withTotalValueOption,
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

  const handleStepChange = (stepId: number) => {
    const newPay = payStepsRules(
      currentStep,
      pay,
      formReferences,
      isCurrentFormValid,
    );

    setPay(newPay);

    const changeStepKey = Object.entries(paySteps).find(
      ([, config]) => config.id === stepId,
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
      setMessage({
        show: true,
        title: "El pago no pudo ser procesado",
        description:
          "Ya fuimos notificados y estamos revisando. Intenta de nuevo más tarde.",
        icon: <MdSentimentNeutral />,
        appearance: "error",
      });
      setLoadingSend(false);
    });
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
    <PayUI
      currentStep={currentStep}
      formReferences={formReferences}
      pay={pay}
      steps={steps}
      isCurrentFormValid={isCurrentFormValid}
      loadingSend={loadingSend}
      message={message}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleFinishAssisted={handleFinishAssisted}
      handleStepChange={handleStepChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
      handleCloseMessage={handleCloseMessage}
    />
  );
}

export { Pay };
