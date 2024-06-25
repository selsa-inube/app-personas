import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const peridiocityData = {
  SINGLE: {
    id: "single",
    value: "Pago único",
  },
  WEEKLY: {
    id: "weekly",
    value: "Semanal",
  },
  BIWEEKLY: {
    id: "biweekly",
    value: "Quincenal",
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
  ANNUAL: {
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
