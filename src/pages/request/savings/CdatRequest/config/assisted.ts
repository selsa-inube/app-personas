import { IFormsCdatRequest, IFormsCdatRequestRefs } from "../types";
import { initalValuesCDAT } from "./initialValues";


const cdatRequestSteps = {
  investment: {
    id: 1,
    name: "Inversión",
    description: "¿Cuál es el valor del monto a invertir?",
  },
  conditions: {
    id: 2,
    name: "Condiciones",
    description:
      "Define las características de tu solicitud.",
  },
  summary: {
    id: 3,
    name: "Resumen",
    description: "Confirma la información diligencias en pasos anteriores.",
  },
};

const cdatStepsRules = (
  currentStep: number,
  currentCdatRequest: IFormsCdatRequest,
  formReferences: IFormsCdatRequestRefs,
  isCurrentFormValid: boolean
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
      }
      return newCdatRequest;
    }
    
  }


  const stepKey = Object.entries(cdatRequestSteps).find(
    ([, config]) => config.id === currentStep
  )?.[0];

  if (!stepKey) return currentCdatRequest;

  const values =
    formReferences[stepKey as keyof IFormsCdatRequest]?.current?.values;
 
  return (newCdatRequest = {
    ...newCdatRequest,
    [stepKey]: { isValid: isCurrentFormValid, values },
  });
};
export { cdatRequestSteps, cdatStepsRules };
