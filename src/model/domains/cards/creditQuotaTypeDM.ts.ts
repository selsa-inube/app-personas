import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const creditQuotaTypeDataDomain = {
  ROTATING: {
    id: "AnObligation",
    value: "Rotativo",
  },
  CONSUMPTION: {
    id: "ConsumptionObligation",
    value: "Crédito por consumo",
  },
};

const creditQuotaTypeDMValueOf = (id: string) =>
  Object.values(creditQuotaTypeDataDomain).find((item) => item.id === id);

const creditQuotaTypeDM = {
  ...creditQuotaTypeDataDomain,
  list: convertDomainToList(creditQuotaTypeDataDomain),
  options: convertDomainToOptions(creditQuotaTypeDataDomain),
  valueOf: creditQuotaTypeDMValueOf,
};

export { creditQuotaTypeDM };
