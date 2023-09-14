const genderData = {
  FEMALE: {
    id: "female",
    value: "Femenino",
    description: "Femenino",
  },
  MASCULINO: {
    id: "masculino",
    value: "Masculino",
    description: "Masculino",
  },
};

const genderDM: typeof genderData & { list: string[] } = {
  ...genderData,
  list: Object.values(genderData).map((gender) => gender.value),
};

export { genderDM };
