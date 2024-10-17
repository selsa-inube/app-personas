import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const aidTypeDataDomain = {
  REQUIRED_AMOUNT: {
    id: "InvoiceValue",
    value: "Hospitalizacion y cirugia",
  },
  REQUIRED_DAYS: {
    id: "DisabilityDays",
    value: "Ayudas diagnosticas",
  },
};

const aidTypeDMValueOf = (id: string) =>
  convertDomainToOptions(aidTypeDataDomain).find((level) => level.id === id);

const aidTypeDM = {
  ...aidTypeDataDomain,
  list: convertDomainToList(aidTypeDataDomain),
  options: convertDomainToOptions(aidTypeDataDomain),
  valueOf: aidTypeDMValueOf,
};

export { aidTypeDM };
