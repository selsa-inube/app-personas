import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const creditPeriodicityDataDomain = {
  ANNUAL: {
    id: "Annual",
    value: "Anual",
  },
  BIWEEKLY: {
    id: "Biweekly",
    value: "Quincenal",
  },
  MONTHLY: {
    id: "Monthly",
    value: "Mensual",
  },
  SEMIANNUAL: {
    id: "Semiannual",
    value: "Semestral",
  },
  BIANNUAL: {
    id: "Biannual",
    value: "Bianual",
  },
};

const creditPeriodicityDMValueOf = (id: string) =>
  Object.values(creditPeriodicityDataDomain).find((item) => item.id === id);

const creditPeriodicityDM = {
  ...creditPeriodicityDataDomain,
  list: convertDomainToList(creditPeriodicityDataDomain),
  options: convertDomainToOptions(creditPeriodicityDataDomain),
  valueOf: creditPeriodicityDMValueOf,
};

export { creditPeriodicityDM };
