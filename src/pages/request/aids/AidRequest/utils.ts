import { mapSystemValidations } from "@forms/SystemValidationsForm/mappers";
import { loadingValidations } from "@forms/SystemValidationsForm/utils";
import { aidRequestSteps } from "./config/assisted";
import { IFormsAidRequest, IFormsAidRequestRefs } from "./types";

const aidRequestStepsRules = (
  currentStep: number,
  currentAidRequest: IFormsAidRequest,
  formReferences: IFormsAidRequestRefs,
  isCurrentFormValid: boolean,
) => {
  const newAidRequest = { ...currentAidRequest };

  switch (currentStep) {
    case aidRequestSteps.detailsSituation.number: {
      const values = formReferences.detailsSituation.current?.values;

      if (!values) return currentAidRequest;

      newAidRequest.detailsSituation = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentAidRequest.detailsSituation.values)
      ) {
        newAidRequest.systemValidations = {
          isValid: false,
          values: {
            ...mapSystemValidations(),
            validations: loadingValidations,
            productId: "values.product.id ",
            productName: "values.product.title",
            amount: 0,
          },
        };
      }

      return newAidRequest;
    }
  }

  const stepKey = Object.entries(aidRequestSteps).find(
    ([, config]) => config.number === currentStep,
  )?.[0];

  if (!stepKey) return currentAidRequest;

  const values =
    formReferences[stepKey as keyof IFormsAidRequest]?.current?.values;

  return {
    ...newAidRequest,
    [stepKey]: { isValid: isCurrentFormValid, values },
  };
};

export { aidRequestStepsRules };
