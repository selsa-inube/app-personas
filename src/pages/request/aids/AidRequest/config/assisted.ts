const aidRequestSteps = {
  beneficiaries: {
    id: "beneficiaries",
    number: 1,
    name: "Beneficiarios",
    description:
      "Selecciona uno de tus Posibles beneficiarios como beneficiario.",
  },
  detailsSituation: {
    id: "detailsSituation",
    number: 2,
    name: "Detalles de la situación",
    description: "Ingresa los valores para conocer tu cupo disponible.",
  },
  systemValidations: {
    id: "systemValidations",
    number: 3,
    name: "Validaciones del sistema",
    description:
      "Revisas cuales son los requisitos necesarios para realizar la solicitud de auxilio.",
  },
  documentaryRequirements: {
    id: "documentaryRequirements",
    number: 4,
    name: "Requisitos documentales",
    description:
      "Adjunta la documentación para cumplir con los requisitos y continuar con tu solicitud.",
  },
  disbursement: {
    id: "disbursement",
    number: 5,
    name: "Forma de desembolso",
    description:
      "Selecciona dónde deseas recibir tu dinero al finalizar el plazo.",
  },
  verification: {
    id: "verification",
    number: 6,
    name: "Verificación",
    description: "Confirma la información diligenciada en pasos anteriores.",
  },
};

export { aidRequestSteps };
