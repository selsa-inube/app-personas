import { IFormsCdatRequest, IFormsCdatRequestRefs } from "../types";
import { initalValuesCDAT } from "./initialValues";
import { savingsMock } from "@mocks/products/savings/savings.mocks";

const cdatRequestSteps = {
  investment: {
    id: 1,
    name: "Inversión",
    description: "¿Cuál es el valor del monto a invertir?",
  },
  conditions: {
    id: 2,
    name: "Condiciones",
    description: "Define las características de tu solicitud.",
  },
  refund: {
    id: 3,
    name: "Reembolso",
    description:
      "Selecciona dónde deseas recibir tu dinero al finalizar el plazo.",
  },
  investmentName: {
    id: 4,
    name: "Nombra tu inversión",
    description: "¿Cómo te gustaría que se llame tu producto?",
  },
  contactChannels: {
    id: 5,
    name: "Canales de contacto",
    description:
      "Selecciona las opciones que nos permitan enviarte información.",
  },
  comments: {
    id: 6,
    name: "Comentarios",
    description:
      "Envía los comentarios que nuestros analistas deberían tener en cuenta.",
  },
  termsAndConditions: {
    id: 7,
    name: "Términos y condiciones",
    description: "Aceptaciones y avisos de privacidad.",
  },
  summary: {
    id: 8,
    name: "Resumen",
    description: "Confirma la información diligencias en pasos anteriores.",
  },
};

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
export { cdatRequestSteps, cdatStepsRules };
