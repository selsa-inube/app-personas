import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const genderData = {
  FEMALE: {
    id: "F",
    value: "Femenino",
  },
  MASCULINO: {
    id: "M",
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
