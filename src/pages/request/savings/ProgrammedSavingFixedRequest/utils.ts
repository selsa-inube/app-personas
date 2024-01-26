import { programmedSavingFixedRequestSteps } from "./config/assisted";
import { initalValuesProgrammedSavingFixed } from "./config/initialValues";
import { filteredOptionsFormReimbursement } from "./forms/ReimbursementForm/utils";
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

  switch (currentStep) {
    case programmedSavingFixedRequestSteps.goal.id: {
      const values = formReferences.goal.current?.values;
      let defaultValueReimbursementType = "";

      if (filteredOptionsFormReimbursement().length > 0) {
        defaultValueReimbursementType =
          filteredOptionsFormReimbursement()[0].id;
      }

      if (!values) return currentprogrammedSavingFixedRequest;

      newprogrammedSavingFixedRequest.goal = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentprogrammedSavingFixedRequest.goal.values)
      ) {
        newprogrammedSavingFixedRequest.reimbursement = {
          isValid: false,
          values: {
            ...initalValuesProgrammedSavingFixed.reimbursement,
            reimbursementType: defaultValueReimbursementType,
          },
        };
      }
      return newprogrammedSavingFixedRequest;
    }
  }

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
