import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const pqrsRegionalDataDomain = {
  PALMIRA: {
    id: "Palmira",
    value: "Regional Palmira",
  },
  BUGA: {
    id: "Buga",
    value: "Regional Buga",
  },
  TULUA: {
    id: "Tuluá",
    value: "Regional Tuluá",
  },
  CARTAGO: {
    id: "Cartago",
    value: "Regional Cartago",
  },
  CALI: {
    id: "Cali",
    value: "Regional Cali",
  },
};

const attentionPlaceDMValueOf = (id: string) =>
  convertDomainToOptions(pqrsRegionalDataDomain).find(
    (option) => option.id === id,
  );

const pqrsAttentionPlaceDM = {
  ...pqrsRegionalDataDomain,
  list: convertDomainToList(pqrsRegionalDataDomain),
  options: convertDomainToOptions(pqrsRegionalDataDomain),
  valueOf: attentionPlaceDMValueOf,
};

export { pqrsAttentionPlaceDM };
