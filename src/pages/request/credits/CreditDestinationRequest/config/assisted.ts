import {
  IFormsCreditDestinationRequest,
  IFormsCreditDestinationRequestRefs,
} from "../types";
import { initalValuesCreditDestination } from "./initialValues";

const creditDestinationRequestSteps = {
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

const creditDestinationStepsRules = (
  currentStep: number,
  currentCreditDestinationRequest: IFormsCreditDestinationRequest,
  formReferences: IFormsCreditDestinationRequestRefs,
  isCurrentFormValid: boolean
) => {
  let newCreditDestinationRequest = { ...currentCreditDestinationRequest };

  switch (currentStep) {
    case creditDestinationRequestSteps.destination.id: {
      const values = formReferences.destination.current?.values;

      if (!values) return currentCreditDestinationRequest;

      newCreditDestinationRequest.destination = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentCreditDestinationRequest.destination.values)
      ) {
        newCreditDestinationRequest.creditConditions = {
          isValid: false,
          values: {
            ...initalValuesCreditDestination.creditConditions,
            creditDestination: values?.creditDestination,
            product: values?.product,
          },
        };
      }

      return newCreditDestinationRequest;
    }
    case creditDestinationRequestSteps.creditConditions.id: {
      const values = formReferences.creditConditions.current?.values;

      if (!values) return currentCreditDestinationRequest;

      newCreditDestinationRequest.creditConditions = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentCreditDestinationRequest.creditConditions.values)
      ) {
        const tempChargesAndDiscounts = Math.floor(
          Number(values.amount) * 0.4880866
        );
        newCreditDestinationRequest.preliquidation = {
          isValid: true,
          values: {
            ...initalValuesCreditDestination.preliquidation,
            amount: Number(values.amount),
            interestAdjustmentCycle: 49250,
            chargesAndDiscounts: tempChargesAndDiscounts,
            netValue: Number(values.amount) - 49250 - tempChargesAndDiscounts,
          },
        };
      }

      return newCreditDestinationRequest;
    }
  }

  const stepKey = Object.entries(creditDestinationRequestSteps).find(
    ([, config]) => config.id === currentStep
  )?.[0];

  if (!stepKey) return currentCreditDestinationRequest;

  const values =
    formReferences[stepKey as keyof IFormsCreditDestinationRequest]?.current
      ?.values;

  return (newCreditDestinationRequest = {
    ...newCreditDestinationRequest,
    [stepKey]: { isValid: isCurrentFormValid, values },
  });
};
export { creditDestinationRequestSteps, creditDestinationStepsRules };

