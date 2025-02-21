import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const civilStatusData = {
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

const civilStatusDMValueOf = (id: string) =>
  Object.values(civilStatusData).find((item) => item.id === id);

const civilStatusDM = {
  ...civilStatusData,
  list: convertDomainToList(civilStatusData),
  options: convertDomainToOptions(civilStatusData),
  valueOf: civilStatusDMValueOf,
};

export { civilStatusDM };
