import { aidRequestSteps } from "./config/assisted";
import { IFormsAidRequest, IFormsAidRequestRefs } from "./types";

const aidRequestStepsRules = (
  currentStep: number,
  currentAidRequest: IFormsAidRequest,
  formReferences: IFormsAidRequestRefs,
  isCurrentFormValid: boolean,
) => {
  const newAidRequest = { ...currentAidRequest };

  const adjustedStep = currentStep + 1;

  const stepKey = Object.entries(aidRequestSteps).find(
    ([, config]) => config.number === adjustedStep,
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
