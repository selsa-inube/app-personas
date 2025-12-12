import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const accountTypeDataDomain = {
  SAVING_ACCOUNT: {
    id: "A-Cuenta de ahorros",
    value: "Cuenta de ahorros",
  },
  CURRENT_ACCOUNT: {
    id: "C-Cuenta corriente",
    value: "Cuenta corriente",
  },
};

const accountTypeDMValueOf = (id: string) =>
  Object.values(accountTypeDataDomain).find((item) => item.id === id);

const accountTypeDM = {
  ...accountTypeDataDomain,
  list: convertDomainToList(accountTypeDataDomain),
  options: convertDomainToOptions(accountTypeDataDomain),
  valueOf: accountTypeDMValueOf,
};

export { accountTypeDM };
