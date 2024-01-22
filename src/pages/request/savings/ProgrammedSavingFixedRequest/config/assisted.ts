import { filteredOptionsFormReimbursement } from "../forms/ReimbursementForm/utils";
import {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
} from "../types";
import { initalValuesProgrammedSavingFixed } from "./initialValues";

const programmedSavingFixedRequestSteps = {
  quota: {
    id: 1,
    name: "Cuota",
    description: "¿Cuál es la cantidad que deseas ahorrar?",
  },
  goal: {
    id: 2,
    name: "Meta",
    description: "Fecha en al que recibirás devuelta tu dinero.",
  },
  reimbursement: {
    id: 3,
    name: "Reembolso",
    description:
      "Selecciona dónde deseas recibir tu dinero al finalizar el plazo.",
  },
  planName: {
    id: 4,
    name: "Nombra tu plan de ahorro",
    description: "¿Cómo te gustaría que se llame tu producto?",
  },
  contactChannels: {
    id: 5,
    name: "Canales de contacto",
    description:
      "Selecciona las opciones que nos permitan enviarte información.",
  },
  summary: {
    id: 6,
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

  switch (currentStep) {
    case programmedSavingFixedRequestSteps.goal.id: {
      const values = formReferences.goal.current?.values;

      const defaultValueReimbursementType =
        filteredOptionsFormReimbursement()[0].id;

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

export { programmedSavingFixedRequestSteps, programmedSavingFixedStepsRules };
