import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { cdatRequestSteps } from "./config/assisted";
import { initalValuesCDAT } from "./config/initialValues";
import { IFormsCdatRequest, IFormsCdatRequestRefs } from "./types";

const cdatStepsRules = (
  currentStep: number,
  currentCdatRequest: IFormsCdatRequest,
  formReferences: IFormsCdatRequestRefs,
  isCurrentFormValid: boolean,
) => {
  let newCdatRequest = { ...currentCdatRequest };

  switch (currentStep) {
    case cdatRequestSteps.investment.id: {
      const values = formReferences.investment.current?.values;

      if (!values) return currentCdatRequest;

      newCdatRequest.investment = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentCdatRequest.investment.values)
      ) {
        newCdatRequest.conditions = {
          isValid: false,
          values: {
            ...initalValuesCDAT.conditions,
            valueInvestment: values.valueInvestment,
          },
        };

        newCdatRequest.paymentMethod = {
          isValid: false,
          values: {
            ...initalValuesCDAT.paymentMethod,
            valueToPay: 500000,
            pendingValue: 500000,
          },
        };
      }
      return newCdatRequest;
    }
    case cdatRequestSteps.conditions.id: {
      const values = formReferences.conditions.current?.values;

      if (!values) return currentCdatRequest;

      newCdatRequest.conditions = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentCdatRequest.conditions.values)
      ) {
        newCdatRequest.refund = {
          isValid: false,
          values: {
            ...initalValuesCDAT.refund,
            refundMethod: "creditToInternalAccount",
            account: savingsMock[0].id,
            accountDescription: savingsMock[0].description,
          },
        };
      }
      return newCdatRequest;
    }
  }

  const stepKey = Object.entries(cdatRequestSteps).find(
    ([, config]) => config.id === currentStep,
  )?.[0];

  if (!stepKey) return currentCdatRequest;

  const values =
    formReferences[stepKey as keyof IFormsCdatRequest]?.current?.values;

  return (newCdatRequest = {
    ...newCdatRequest,
    [stepKey]: { isValid: isCurrentFormValid, values },
  });
};

export { cdatStepsRules };
