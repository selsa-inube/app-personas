import { IFormsCdatRequest, IFormsCdatRequestRefs } from "../types";

const cdatRequestSteps = {
  investment: {
    id: 1,
    name: "Inversión",
    description: "¿Cuál es el valor del monto a invertir?",
  },
  contactChannels: {
    id: 2,
    name: "Canales de contacto",
    description:
      "Selecciona las opciones que nos permitan enviarte información.",
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
