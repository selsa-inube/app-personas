import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const maritalStatusData = {
  SINGLE: {
    id: "S",
    value: "Soltero",
  },
  MARRIED: {
    id: "C",
    value: "Casado",
  },
  DIVORCED: {
    id: "D",
    value: "Divorciado",
  },
  WIDOWED: {
    id: "V",
    value: "Viudo",
  },
  SEPARATED: {
    id: "S",
    value: "Separado",
  },
};

const maritalStatusDMValueOf = (id: string) =>
  Object.values(maritalStatusData).find((item) => item.id === id);

const maritalStatusDM = {
  ...maritalStatusData,
  list: convertDomainToList(maritalStatusData),
  options: convertDomainToOptions(maritalStatusData),
  valueOf: maritalStatusDMValueOf,
};

export { maritalStatusDM };
