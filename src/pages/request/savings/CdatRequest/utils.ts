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
    case cdatRequestSteps.investment.number: {
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
  }

  const stepKey = Object.entries(cdatRequestSteps).find(
    ([, config]) => config.number === currentStep,
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
