import { programmedSavingFixedRequestSteps } from "./config/assisted";
import {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
} from "./types";

const programmedSavingFixedStepsRules = (
  currentStep: number,
  currentprogrammedSavingFixedRequest: IFormsProgrammedSavingFixedRequest,
  formReferences: IFormsProgrammedSavingFixedRequestRefs,
  isCurrentFormValid: boolean,
) => {
  let newprogrammedSavingFixedRequest = {
    ...currentprogrammedSavingFixedRequest,
  };

  const stepKey = Object.entries(programmedSavingFixedRequestSteps).find(
    ([, config]) => config.id === currentStep,
  )?.[0];

  if (!stepKey) return currentprogrammedSavingFixedRequest;

  const values =
    formReferences[stepKey as keyof IFormsProgrammedSavingFixedRequest]?.current
      ?.values;

  return (newprogrammedSavingFixedRequest = {
    ...newprogrammedSavingFixedRequest,
    [stepKey]: { isValid: isCurrentFormValid, values },
  });
};

export { programmedSavingFixedStepsRules };
