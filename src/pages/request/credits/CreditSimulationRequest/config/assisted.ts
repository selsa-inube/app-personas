import {
  IFormsCreditSimulationRequest,
  IFormsCreditSimulationRequestRefs,
} from "../types";
import { initalValuesCreditSimulation } from "./initialValues";

const creditSimulationRequestSteps = {
  destination: {
    id: 1,
    name: "Destinación del dinero",
    description: "Cuéntanos cuál es el propósito de tu crédito.",
  },
  creditConditions: {
    id: 2,
    name: "Condiciones del crédito",
    description: "Ingresa los valores para simular tu crédito.",
  },
  preliquidation: {
    id: 3,
    name: "Preliquidación",
    description:
      "Revisa el proceso de amortización de tu solicitud de crédito.",
  },
  disbursement: {
    id: 4,
    name: "Desembolso",
    description: "Selecciona la forma de desembolso.",
  },
  comments: {
    id: 5,
    name: "Comentarios",
    description:
      "Envía los comentarios que nuestros analistas deberían tener en cuenta.",
  },
  termsAndConditions: {
    id: 6,
    name: "Términos y condiciones",
    description: "Aceptaciones y avisos de privacidad.",
  },
  communicationChannels: {
    id: 7,
    name: "Canales de comunicación",
    description:
      "Selecciona las opciones que nos permitan enviarte información.",
  },
  verification: {
    id: 8,
    name: "Verificación",
    description:
      "Verifica la información que diligenciaste en tu solicitud de crédito.",
  },
};

const creditSimulationStepsRules = (
  currentStep: number,
  currentCreditSimulationRequest: IFormsCreditSimulationRequest,
  formReferences: IFormsCreditSimulationRequestRefs,
  isCurrentFormValid: boolean
) => {
  let newCreditSimulationRequest = { ...currentCreditSimulationRequest };

  switch (currentStep) {
    case creditSimulationRequestSteps.destination.id: {
      const values = formReferences.destination.current?.values;

      if (!values) return currentCreditSimulationRequest;

      newCreditSimulationRequest.destination = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentCreditSimulationRequest.destination.values)
      ) {
        newCreditSimulationRequest.creditConditions = {
          isValid: false,
          values: {
            ...initalValuesCreditSimulation.creditConditions,
            creditDestination: values?.creditDestination,
            product: values?.product,
          },
        };
      }

      return newCreditSimulationRequest;
    }
    case creditSimulationRequestSteps.creditConditions.id: {
      const values = formReferences.creditConditions.current?.values;

      if (!values) return currentCreditSimulationRequest;

      newCreditSimulationRequest.creditConditions = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentCreditSimulationRequest.creditConditions.values)
      ) {
        const tempChargesAndDiscounts = Math.floor(
          Number(values.amount) * 0.4880866
        );
        newCreditSimulationRequest.preliquidation = {
          isValid: true,
          values: {
            ...initalValuesCreditSimulation.preliquidation,
            amount: Number(values.amount),
            interestAdjustmentCycle: 49250,
            chargesAndDiscounts: tempChargesAndDiscounts,
            netValue: Number(values.amount) - 49250 - tempChargesAndDiscounts,
          },
        };
      }

      return newCreditSimulationRequest;
    }
  }

  const stepKey = Object.entries(creditSimulationRequestSteps).find(
    ([, config]) => config.id === currentStep
  )?.[0];

  if (!stepKey) return currentCreditSimulationRequest;

  const values =
    formReferences[stepKey as keyof IFormsCreditSimulationRequest]?.current
      ?.values;

  return (newCreditSimulationRequest = {
    ...newCreditSimulationRequest,
    [stepKey]: { isValid: isCurrentFormValid, values },
  });
};
export { creditSimulationRequestSteps, creditSimulationStepsRules };
