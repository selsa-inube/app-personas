import { personalResidenceSteps } from "./config/assisted";
import { initialValuesPersonalResidence } from "./config/initialValues";
import {
  IFormsCreatePersonalResidence,
  IFormsCreatePersonalResidenceRefs,
} from "./types";

const createPersonalResidenceStepsRules = (
  currentStep: number,
  currentPersonalResidence: IFormsCreatePersonalResidence,
  formReferences: IFormsCreatePersonalResidenceRefs,
  isCurrentFormValid: boolean,
) => {
  const newPersonalResidence = { ...currentPersonalResidence };

  switch (currentStep) {
    case personalResidenceSteps.residenceType.number: {
      const values = formReferences.residenceType.current?.values;

      if (!values) {
        return {
          newPersonalResidence: currentPersonalResidence,
        };
      }

      newPersonalResidence.residenceType = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        values.type !== currentPersonalResidence.residenceType.values.type
      ) {
        newPersonalResidence.residenceDetails = {
          isValid: false,
          values: {
            ...initialValuesPersonalResidence.residenceDetails,
          },
        };
      }

      return {
        newPersonalResidence,
      };
    }

    case personalResidenceSteps.residenceDetails.number: {
      const values = formReferences.residenceDetails.current?.values;

      if (!values) {
        return {
          newPersonalResidence: currentPersonalResidence,
        };
      }

      newPersonalResidence.residenceDetails = {
        isValid: isCurrentFormValid,
        values,
      };

      return {
        newPersonalResidence,
      };
    }
  }

  const stepKey = Object.entries(personalResidenceSteps).find(
    ([, config]) => config.number === currentStep,
  )?.[0];

  if (!stepKey)
    return {
      newPersonalResidence: currentPersonalResidence,
    };

  const values =
    formReferences[stepKey as keyof IFormsCreatePersonalResidence]?.current
      ?.values;

  return {
    newPersonalResidence: {
      ...newPersonalResidence,
      [stepKey]: { isValid: isCurrentFormValid, values },
    },
  };
};

export { createPersonalResidenceStepsRules };
