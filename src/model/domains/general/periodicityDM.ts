import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const periodicityDataDomain = {
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
    value: "Semisemanal",
  },
  BIWEEKLY: {
    id: "Biweekly",
    value: "Quincenal",
  },
  MONTHLY: {
    id: "Monthly",
    value: "Mensual",
  },
  ANNUAL: {
    id: "Annual",
    value: "Anual",
  },
  BIMONTHLY: {
    id: "Bimonthly",
    value: "Bimestral",
  },
  QUARTERLY: {
    id: "Quarterly",
    value: "Trimestral",
  },
  FOURMONTHS: {
    id: "FourMonths",
    value: "Cuatrimestral",
  },
  FIVEMONTHS: {
    id: "FiveMonths",
    value: "Quintomestral",
  },
  BIANNUAL: {
    id: "Biannual",
    value: "Bienal",
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
