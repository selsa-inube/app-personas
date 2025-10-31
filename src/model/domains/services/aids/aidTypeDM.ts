import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const aidTypeDataDomain = {
  REQUIRED_AMOUNT: {
    id: "InvoiceValue",
    value: "Requiere monto",
  },
  REQUIRED_DAYS: {
    id: "Days",
    value: "Requiere días",
  },
  REQUIRED_PERSON: {
    id: "PerPerson",
    value: "Requiere por persona",
  },
};

const aidTypeDMValueOf = (id: string) =>
  Object.values(aidTypeDataDomain).find((level) => level.id === id);

const aidTypeDM = {
  ...aidTypeDataDomain,
  list: convertDomainToList(aidTypeDataDomain),
  options: convertDomainToOptions(aidTypeDataDomain),
  valueOf: aidTypeDMValueOf,
};

export { aidTypeDM };
