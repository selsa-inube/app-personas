import { convertDomainToOptions, convertDomainToList } from "src/utils/domains";

const genderData = {
  FEMALE: {
    id: "female",
    value: "Femenino",
  },
  MASCULINO: {
    id: "masculino",
    value: "Masculino",
  },
};

const genderDMValueOf = (id: string) =>
  Object.values(genderData).find((item) => item.id === id);

const genderDM = {
  ...genderData,
  list: convertDomainToList(genderData),
  options: convertDomainToOptions(genderData),
  valueOf: genderDMValueOf,
};

export { genderDM };
