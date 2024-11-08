import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const accountDebitTypeDataDomain = {
  INTERNAL_OWN_ACCOUNT_DEBIT: {
    id: "internalOwnAccountDebit",
    value: "Débito a cuenta propia interna",
  },
  EXTERNAL_OWN_ACCOUNT_DEBIT: {
    id: "externalOwnAccountDebit",
    value: "Débito a cuenta propia externa",
  },
};

const accountDebitTypeDMValueOf = (id: string) =>
  convertDomainToOptions(accountDebitTypeDataDomain).find(
    (type) => type.id === id,
  );

const accountDebitTypeDM = {
  ...accountDebitTypeDataDomain,
  list: convertDomainToList(accountDebitTypeDataDomain),
  options: convertDomainToOptions(accountDebitTypeDataDomain),
  valueOf: accountDebitTypeDMValueOf,
};

export { accountDebitTypeDM };
