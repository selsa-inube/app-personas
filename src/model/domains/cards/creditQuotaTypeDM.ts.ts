import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const creditQuotaTypeDataDomain = {
  ROTATING: {
    id: "AnObligation",
    value: "Rotativo",
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
