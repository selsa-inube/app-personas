import { convertDomainToOptions, convertDomainToList } from "src/utils/domains";

const maritalStatusData = {
  SINGLE: {
    id: "single",
    value: "Soltero",
  },
  MARRIED: {
    id: "married",
    value: "Casado",
  },
  DIVORCED: {
    id: "divorced",
    value: "Divorciado",
  },
  WIDOWED: {
    id: "widowed",
    value: "Viudo",
  },
  SEPARATED: {
    id: "separated",
    value: "Separado",
  },
};

const maritalStatusDMValueOf = (id: string) =>
  convertDomainToOptions(maritalStatusData).find((city) => city.id === id);

const maritalStatusDM = {
  ...maritalStatusData,
  list: convertDomainToList(maritalStatusData),
  options: convertDomainToOptions(maritalStatusData),
  valueOf: maritalStatusDMValueOf,
};

export { maritalStatusDM };
