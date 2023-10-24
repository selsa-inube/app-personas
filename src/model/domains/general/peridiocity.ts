import { convertDomainToList, convertDomainToOptions } from "../helper";

const peridiocityData = {
  MONTHLY: {
    id: "monthly",
    value: "Mensual",
  },
  SEMIANNUAL: {
    id: "semiannual",
    value: "Semestral",
  },
  ANNUAK: {
    id: "annual",
    value: "Anual",
  },
};

const peridiocityDMValueOf = (id: string) =>
  convertDomainToOptions(peridiocityData).find((city) => city.id === id);

const peridiocityDM = {
  ...peridiocityData,
  list: convertDomainToList(peridiocityData),
  options: convertDomainToOptions(peridiocityData),
  valueOf: peridiocityDMValueOf,
};

export { peridiocityDM };
