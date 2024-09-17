import { mapPaymentMethod } from "@forms/PaymentMethodForm/mappers";
import { programmedSavingFixedRequestSteps } from "./config/assisted";
import {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
} from "./types";

const programmedSavingFixedStepsRules = (
  currentStep: number,
  currentProgrammedSavingFixedRequest: IFormsProgrammedSavingFixedRequest,
  formReferences: IFormsProgrammedSavingFixedRequestRefs,
  isCurrentFormValid: boolean,
) => {
  let newProgrammedSavingFixedRequest = {
    ...currentProgrammedSavingFixedRequest,
  };

  switch (currentStep) {
    case programmedSavingFixedRequestSteps.savingConditions.id: {
      const values = formReferences.savingConditions.current?.values;

      if (!values) return currentProgrammedSavingFixedRequest;

      newProgrammedSavingFixedRequest.savingConditions = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(
          currentProgrammedSavingFixedRequest.savingConditions.values,
        )
      ) {
        newProgrammedSavingFixedRequest.paymentMethod = {
          isValid: false,
          values: {
            ...mapPaymentMethod(),
            paymentMethodType: values.paymentMethod?.id || "",
            paymentMethods: values.paymentMethods,
          },
        };
      }

      return newProgrammedSavingFixedRequest;
    }
  }

  const stepKey = Object.entries(programmedSavingFixedRequestSteps).find(
    ([, config]) => config.id === currentStep,
  )?.[0];

  if (!stepKey) return currentProgrammedSavingFixedRequest;

  const values =
    formReferences[stepKey as keyof IFormsProgrammedSavingFixedRequest]?.current
      ?.values;

  return (newProgrammedSavingFixedRequest = {
    ...newProgrammedSavingFixedRequest,
    [stepKey]: { isValid: isCurrentFormValid, values },
  });
};

export { programmedSavingFixedStepsRules };
