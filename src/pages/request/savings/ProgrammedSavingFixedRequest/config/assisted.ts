const programmedSavingFixedRequestSteps = {
  savingConditions: {
    id: "savingConditions",
    number: 1,
    name: "Condiciones del ahorro",
    description: "¿Cuál es la cantidad que deseas ahorrar?",
  },
  paymentMethod: {
    id: "paymentMethod",
    number: 2,
    name: "Forma de pago",
    description: "Completa los detalles de la forma de pago.",
  },
  shareMaturity: {
    id: "shareMaturity",
    number: 3,
    name: "Acción al vencimiento",
    description:
      "Selecciona la decisión que deseas tomar al final de tu producto.",
  },
  disbursement: {
    id: "disbursement",
    number: 4,
    name: "Reembolso",
    description:
      "Selecciona dónde deseas recibir tu dinero al finalizar el plazo.",
  },
  systemValidations: {
    id: "systemValidations",
    number: 5,
    name: "Validaciones del sistema",
    description:
      "Revisa cuales son los requisitos necesarios para realizar la solicitud de ahorro.",
  },
  planName: {
    id: "planName",
    number: 6,
    name: "Nombra tu plan de ahorro",
    description: "¿Cómo te gustaría que se llame tu producto?",
  },
  comments: {
    id: "comments",
    number: 7,
    name: "Comentarios",
    description:
      "Envía los comentarios que nuestros analistas deberían tener en cuenta.",
  },
  termsAndConditions: {
    id: "termsAndConditions",
    number: 8,
    name: "Términos y condiciones",
    description: "Aceptaciones y avisos de privacidad.",
  },
  contactChannels: {
    id: "contactChannels",
    number: 9,
    name: "Canales de contacto",
    description:
      "Selecciona las opciones que nos permitan enviarte información.",
  },
  verification: {
    id: "verification",
    number: 10,
    name: "Resumen",
    description: "Confirma la información diligencias en pasos anteriores.",
  },
};

export { programmedSavingFixedRequestSteps };
