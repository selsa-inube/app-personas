import { paymentsMock } from "@mocks/payments/payments.mocks";
import { mapComments } from "@pages/general/UpdateData/config/mappers";
import { FormikProps } from "formik";
import { useRef, useState } from "react";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { paySteps } from "./config/assisted";
import { mapObligations, mapPaymentMethod } from "./config/mappers";
import { IObligationsEntry } from "./forms/ObligationsForm/types";
import { IPaymentMethodEntry } from "./forms/PaymentMethodForm/types";
import { PayUI } from "./interface";
import { IFormsPay, IFormsPayRefs } from "./types";
import { payStepsRules } from "./utils";

function Pay() {
  const [currentStep, setCurrentStep] = useState(paySteps.obligations.id);
  const steps = Object.values(paySteps);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);

  const [pay, setPay] = useState<IFormsPay>({
    obligations: {
      isValid: true,
      values: mapObligations(paymentsMock),
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
    return true;
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
