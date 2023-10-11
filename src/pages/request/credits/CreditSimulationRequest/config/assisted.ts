import {
  IFormsCreditSimulationRequest,
  IFormsCreditSimulationRequestRefs,
} from "../types";
import { initalValuesCreditSimulation } from "./initialValues";

const creditSimulationRequestSteps = {
  destination: {
    id: 1,
    name: "Destinación",
    description: "Cuéntanos cuál es el propósito de tu crédito.",
  },
  simulation: {
    id: 2,
    name: "Simulación",
    description: "Description",
  },
  preliquidation: {
    id: 3,
    name: "Preliquidación",
    description: "Description.",
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
  verification: {
    id: 7,
    name: "Confirmación",
    description:
      "Verifica que la información que diligenciaste en tu solicitud de crédito.",
  },
};

const stepsValuesRules = (
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
        newCreditSimulationRequest.simulation = {
          isValid: false,
          values: {
            ...initalValuesCreditSimulation.simulation,
            creditDestination: values?.creditDestination,
            product: values?.product,
          },
        };
      }

      break;
    }
    case creditSimulationRequestSteps.simulation.id: {
      const values = formReferences.simulation.current?.values;

      if (!values) return currentCreditSimulationRequest;

      newCreditSimulationRequest.simulation = {
        isValid: isCurrentFormValid,
        values,
      };

      break;
    }
    case creditSimulationRequestSteps.comments.id: {
      const values = formReferences.comments.current?.values;

      if (!values) return currentCreditSimulationRequest;

      newCreditSimulationRequest.comments = {
        isValid: isCurrentFormValid,
        values,
      };

      break;
    }
  }

  return newCreditSimulationRequest;
};
export { creditSimulationRequestSteps, stepsValuesRules };
