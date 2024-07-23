import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const periodicityDataDomain = {
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

const periodicityDMValueOf = (id: string) =>
  convertDomainToOptions(periodicityDataDomain).find((city) => city.id === id);

const periodicityDM = {
  ...periodicityDataDomain,
  list: convertDomainToList(periodicityDataDomain),
  options: convertDomainToOptions(periodicityDataDomain),
  valueOf: periodicityDMValueOf,
};

export { periodicityDM };
