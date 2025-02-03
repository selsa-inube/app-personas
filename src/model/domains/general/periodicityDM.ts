import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const periodicityDataDomain = {
  SINGLE: {
    id: "Single",
    value: "Pago único",
  },
  WEEKLY: {
    id: "Weekly",
    value: "Semanal",
  },
  BIWEEKLY: {
    id: "Biweekly",
    value: "Quincenal",
  },
  MONTHLY: {
    id: "Monthly",
    value: "Mensual",
  },
  QUARTERLY: {
    id: "Quarterly",
    value: "Trimestral",
  },
  SEMIANNUAL: {
    id: "Semiannual",
    value: "Semestral",
  },
  ANNUAL: {
    id: "Annual",
    value: "Anual",
  },
};

const periodicityDMValueOf = (id: string) =>
  Object.values(periodicityDataDomain).find((item) => item.id === id);

const periodicityDM = {
  ...periodicityDataDomain,
  list: convertDomainToList(periodicityDataDomain),
  options: convertDomainToOptions(periodicityDataDomain),
  valueOf: periodicityDMValueOf,
};

export { periodicityDM };
