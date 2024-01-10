import { convertDomainToList, convertDomainToOptions } from "../helper";

const peridiocityData = {
  SINGLE:{
    id: "single",
    value: "Pago único",
  },
  MONTHLY: {
    id: "monthly",
    value: "Mensual",
  },
  QUARTERLY: {
    id: "quarterly",
    value: "Trimestral",
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
