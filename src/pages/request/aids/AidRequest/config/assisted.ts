const aidRequestSteps = {
  beneficiaries: {
    id: "beneficiaries",
    number: 1,
    name: "Beneficiarios",
    description:
      "Selecciona uno de tus Posibles beneficiarios como beneficiario.",
  },
  amount: {
    id: "amount",
    number: 2,
    name: "Monto",
    description: "Ingresa los valores para conocer tu cupo disponible.",
  },
  detailsSituation: {
    id: "detailsSituation",
    number: 3,
    name: "Detalles de la situación",
    description:
      "Describe brevemente los detalles para la solicitud de auxilio.",
  },
  systemValidations: {
    id: "systemValidations",
    number: 4,
    name: "Validaciones del sistema",
    description:
      "Revisas cuales son los requisitos necesarios para realizar la solicitud de auxilio.",
  },
  documentaryRequirements: {
    id: "documentaryRequirements",
    number: 5,
    name: "Requisitos documentales",
    description:
      "Adjunta la documentación para cumplir con los requisitos y continuar con tu solicitud.",
  },
  disbursement: {
    id: "disbursement",
    number: 6,
    name: "Forma de desembolso",
    description:
      "Selecciona dónde deseas recibir tu dinero al finalizar el plazo.",
  },
  verification: {
    id: "verification",
    number: 7,
    name: "Verificación",
    description: "Confirma la información diligenciada en pasos anteriores.",
  },
};

export { aidRequestSteps };
