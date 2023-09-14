const bloodTypeData = {
  O_POSITIVE: {
    id: "o_positive",
    value: "O+",
    description: "Tipo de sangre O positivo",
  },
  O_NEGATIVE: {
    id: "o_negative",
    value: "O-",
    description: "Tipo de sangre O negativo",
  },
  A_POSITIVE: {
    id: "a_positive",
    value: "A+",
    description: "Tipo de sangre A positivo",
  },
  A_NEGATIVE: {
    id: "a_negative",
    value: "A-",
    description: "Tipo de sangre A negativo",
  },
  B_POSITIVE: {
    id: "b_positive",
    value: "B+",
    description: "Tipo de sangre B positivo",
  },
  B_NEGATIVE: {
    id: "b_negative",
    value: "B-",
    description: "Tipo de sangre B negativo",
  },
  AB_POSITIVE: {
    id: "ab_positive",
    value: "AB+",
    description: "Tipo de sangre AB positivo",
  },
  AB_NEGATIVE: {
    id: "ab_negative",
    value: "AB-",
    description: "Tipo de sangre AB negativo",
  },
};

const bloodTypeDM: typeof bloodTypeData & { list: string[] } = {
  ...bloodTypeData,
  list: Object.values(bloodTypeData).map((bloodType) => bloodType.value),
};

export { bloodTypeDM };
