import { useAuth } from "@inube/auth";
import { mapComments } from "@pages/general/UpdateData/config/mappers";
import { FormikProps } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { CreditsContext } from "src/context/credits";
import { SavingsContext } from "src/context/savings";
import { getCreditsForUser } from "src/services/iclient/credits/getCredits";
import { getSavingsCommitmentsForUser } from "src/services/iclient/savings/getCommitments";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
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
  const { user, accessToken } = useAuth();
  const { credits } = useContext(CreditsContext);
  const { commitments } = useContext(SavingsContext);

  const [pay, setPay] = useState<IFormsPay>({
    obligations: {
      isValid: true,
      values: mapObligations(credits, commitments),
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
    if (!user || !accessToken) return;

    let newCredits = credits;

    if (credits.length === 0) {
      newCredits = await getCreditsForUser(user.identification, accessToken);

      setPay((prev) => ({
        ...prev,
        obligations: {
          ...prev.obligations,
          values: mapObligations(newCredits, commitments),
        },
      }));
    }

    if (commitments.length === 0) {
      const newCommitments = await getSavingsCommitmentsForUser(
        user.identification,
        accessToken,
      );

      setPay((prev) => ({
        ...prev,
        obligations: {
          ...prev.obligations,
          values: mapObligations(newCredits, newCommitments),
        },
      }));
    }
  };

  useEffect(() => {
    validateObligations();
  }, [user, accessToken]);

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

    sendPaymentRequest(user, pay, accessToken);
  };

  const handleNextStep = () => {
    if (currentStep + 1 <= steps.length) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    handleStepChange(currentStep - 1);
  };

  return (
    <PayUI
      currentStep={currentStep}
      formReferences={formReferences}
      pay={pay}
      steps={steps}
      isCurrentFormValid={isCurrentFormValid}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleFinishAssisted={handleFinishAssisted}
      handleStepChange={handleStepChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
    />
  );
}

export { Pay };
