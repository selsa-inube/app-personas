import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const creditPeriodicityDataDomain = {
  DIARY: {
    id: "Diary",
    value: "Diario",
  },
  WEEKLY: {
    id: "Weekly",
    value: "Semanal",
  },
  DECADAL: {
    id: "Decadal",
    value: "Decadal",
  },
  SEMIWEEKLY: {
    id: "Semiweekly",
    value: "Bisemanal",
  },
  BIWEEKLY: {
    id: "Biweekly",
    value: "Quincenal",
  },
  MONTHLY: {
    id: "Monthly",
    value: "Mensual",
  },
  BIMONTHLY: {
    id: "Bimonthly",
    value: "Bimensual",
  },
  QUARTERLY: {
    id: "Quarterly",
    value: "Trimestral",
  },
  FOUR_MONTHS: {
    id: "FourMonths",
    value: "Cuatrimestral",
  },
  FIVE_MONTHS: {
    id: "FiveMonths",
    value: "Cinco Meses",
  },
  BIANNUAL: {
    id: "Biannual",
    value: "Semestral",
  },
  ANNUAL: {
    id: "Annual",
    value: "Anual",
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
