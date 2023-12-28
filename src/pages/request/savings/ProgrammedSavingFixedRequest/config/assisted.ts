import {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
} from "../types";

const programmedSavingFixedRequestSteps = {
  quota: {
    id: 1,
    name: "Cuota",
    description: "¿Cuál es la cantidad que deseas ahorrar?",
  },
  summary: {
    id: 2,
    name: "Resumen",
    description: "Confirma la información diligencias en pasos anteriores.",
  },
};

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
    ([, config]) => config.id === currentStep
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
export { programmedSavingFixedRequestSteps, programmedSavingFixedStepsRules };
