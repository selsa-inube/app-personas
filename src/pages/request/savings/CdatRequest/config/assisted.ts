const cdatRequestSteps = {
  investment: {
    id: "investment",
    number: 1,
    name: "Inversión",
    description: "¿Cuál es el valor del monto a invertir?",
  },
  deadline: {
    id: "deadline",
    number: 2,
    name: "Plazo",
    description: "Define las características de tu solicitud.",
  },
  interestPayment: {
    id: "interestPayment",
    number: 3,
    name: "Pago de intereses",
    description: "¿Cuándo deseas recibir los intereses de tu producto?",
  },
  paymentMethod: {
    id: "paymentMethod",
    number: 4,
    name: "Forma de pago",
    description: "Selecciona la forma como deseas pagar.",
  },
  disbursement: {
    id: "disbursement",
    number: 5,
    name: "Reembolso",
    description:
      "Selecciona dónde deseas recibir tu dinero al finalizar el plazo.",
  },
  actionExpiration: {
    id: "actionExpiration",
    number: 6,
    name: "Acción al vencimiento",
    description:
      "Selecciona la decisión que deseas tomar al final de tu producto.",
  },
  systemValidations: {
    id: "systemValidations",
    number: 7,
    name: "Validaciones del sistema",
    description:
      "Revisas cuales son los requisitos necesarios para realizar la solicitud de crédito.",
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
    name: "Verificación",
    description: "Confirma la información diligenciada en pasos anteriores.",
  },
};

export { cdatRequestSteps };
