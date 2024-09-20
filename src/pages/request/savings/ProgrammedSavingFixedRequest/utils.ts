import { mapPaymentMethod } from "@forms/PaymentMethodForm/mappers";
import { mapSystemValidations } from "@forms/SystemValidationsForm/mappers";
import { loadingValidations } from "@forms/SystemValidationsForm/utils";
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

  const adjustedStep = currentStep + 1;

  switch (adjustedStep) {
    case programmedSavingFixedRequestSteps.savingConditions.number: {
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
        newProgrammedSavingFixedRequest.systemValidations = {
          isValid: false,
          values: {
            ...mapSystemValidations(),
            validations: loadingValidations,
            destinationId: "",
            destinationName: "",
            productId: "57", // TEMP
            productName: "",
            paymentMethod: values.paymentMethod?.id || "",
            paymentMethodName: values.paymentMethod?.value || "",
            amount: values.savingAmount || 0,
            deadline: values.deadline || 0,
            rate: values.annualRate,
            amortizationType: "",
            periodicity: values.periodicity.id,
            quota: values.quota || 0,
            netValue: values.netValue,
          },
        };

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
    ([, config]) => config.number === adjustedStep,
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
