import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const accountTypeDataDomain = {
  SAVING_ACCOUNT: {
    id: "A-Cuenta ahorro",
    value: "Cuenta de ahorros",
  },
  CURRENT_ACCOUNT: {
    id: "B-Cuenta corriente",
    value: "Cuenta corriente",
  },
};

const accountTypeDMValueOf = (id: string) =>
  convertDomainToOptions(accountTypeDataDomain).find(
    (value) => value.id === id,
  );

const accountTypeDM = {
  ...accountTypeDataDomain,
  list: convertDomainToList(accountTypeDataDomain),
  options: convertDomainToOptions(accountTypeDataDomain),
  valueOf: accountTypeDMValueOf,
};

export { accountTypeDM };
