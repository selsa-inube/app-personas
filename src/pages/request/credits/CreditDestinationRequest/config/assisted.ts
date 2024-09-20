const creditDestinationRequestSteps = {
  destination: {
    id: "destination",
    number: 1,
    name: "Destino del dinero",
    description: "Cuéntanos cuál es el propósito de tu crédito.",
  },
  creditConditions: {
    id: "creditConditions",
    number: 2,
    name: "Condiciones del crédito",
    description: "Ingresa los valores para simular tu crédito.",
  },
  paymentMethod: {
    id: "paymentMethod",
    number: 3,
    name: "Forma de pago",
    description: "Completa los detalles de la forma de pago.",
  },
  disbursement: {
    id: "disbursement",
    number: 4,
    name: "Forma de desembolso",
    description: "Selecciona la forma de desembolso.",
  },
  systemValidations: {
    id: "systemValidations",
    number: 5,
    name: "Validaciones del sistema",
    description:
      "Revisas cuales son los requisitos necesarios para realizar la solicitud de crédito.",
  },
  documentaryRequirements: {
    id: "documentaryRequirements",
    number: 6,
    name: "Requisitos documentales",
    description:
      "Adjunta la documentación para cumplir con los requisitos y continuar con tu solicitud.",
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
    name: "Verificación",
    description:
      "Verifica la información que diligenciaste en tu solicitud de crédito.",
  },
};

export { creditDestinationRequestSteps };
