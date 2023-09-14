const maritalStatusData = {
  SINGLE: {
    id: "single",
    value: "Soltero",
    description: "Una persona que no está casada",
  },
  MARRIED: {
    id: "married",
    value: "Casado",
    description: "Una persona que está casada",
  },
  DIVORCED: {
    id: "divorced",
    value: "Divorciado",
    description: "Una persona que se ha divorciado después de un matrimonio",
  },
  WIDOWED: {
    id: "widowed",
    value: "Viudo",
    description:
      "Una persona cuyo cónyuge ha fallecido y que no se ha vuelto a casar",
  },
  SEPARATED: {
    id: "separated",
    value: "Separado",
    description: "Una persona que está casada pero vive separada de su cónyuge",
  },
};

const maritalStatusDM: typeof maritalStatusData & { list: string[] } = {
  ...maritalStatusData,
  list: Object.values(maritalStatusData).map(
    (maritalStatus) => maritalStatus.value
  ),
};

export { maritalStatusDM };
