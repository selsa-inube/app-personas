import { paySteps } from "./config/assisted";
import { mapPaymentMethod } from "./config/mappers";
import { IFormsPay, IFormsPayRefs } from "./types";

const payStepsRules = (
  currentStep: number,
  currentPay: IFormsPay,
  formReferences: IFormsPayRefs,
  isCurrentFormValid: boolean,
) => {
  let newPay = { ...currentPay };

  switch (currentStep) {
    case paySteps.obligations.id: {
      const values = formReferences.obligations.current?.values;

      if (!values) return currentPay;

      newPay.obligations = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !== JSON.stringify(currentPay.obligations.values)
      ) {
        newPay.paymentMethod = {
          isValid: false,
          values: {
            ...mapPaymentMethod(),
            valueToPay: values.totalPayment,
            pendingValue: values.totalPayment,
          },
        };
      }

      return newPay;
    }
  }

  const stepKey = Object.entries(paySteps).find(
    ([, config]) => config.id === currentStep,
  )?.[0];

  if (!stepKey) return currentPay;

  const values = formReferences[stepKey as keyof IFormsPay]?.current?.values;

  return (newPay = {
    ...newPay,
    [stepKey]: { isValid: isCurrentFormValid, values },
  });
};

export { payStepsRules };
