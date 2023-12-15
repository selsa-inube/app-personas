import {
    IFormsCdatRequest,
    IFormsCdatRequestRefs,
  } from "../types";
  import { initalValuesCdat } from "./initialValues";
  
  const cdatRequestSteps = {
    investment: {
      id: 1,
      name: "Inversión",
      description: "¿Cuál es el valor del monto a invertir?",
    },
    verification: {
        id: 2,
        name: "verificación",
        description: "Verifica que la información diligenciada sea correcta y envía la solicitud.",
      },
  };
  
  const cdatStepsRules = (
    currentStep: number,
    currentcdatRequest: IFormsCdatRequest,
    formReferences: IFormsCdatRequestRefs,
    isCurrentFormValid: boolean
  ) => {
    let newcdatRequest = { ...currentcdatRequest };
    
    const stepKey = Object.entries(cdatRequestSteps).find(
      ([, config]) => config.id === currentStep
    )?.[0];
  
    if (!stepKey) return currentcdatRequest;
  
    const values =
      formReferences[stepKey as keyof IFormsCdatRequest]?.current
        ?.values;
  
    return (newcdatRequest = {
      ...newcdatRequest,
      [stepKey]: { isValid: isCurrentFormValid, values },
    });
  };
  export { cdatRequestSteps, cdatStepsRules };
  