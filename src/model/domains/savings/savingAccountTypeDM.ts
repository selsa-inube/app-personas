import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const savingAccountTypeDataDomain = {
  SAVING_ACCOUNT: {
    id: "SavingsAccount",
    value: "Cuenta de ahorros",
  },
  CHECKING_ACCOUNT: {
    id: "CheckingAccount",
    value: "Cuenta corriente",
  },
};

const savingAccountTypeDMValueOf = (id: string) =>
  convertDomainToOptions(savingAccountTypeDataDomain).find(
    (value) => value.id === id,
  );

const savingAccountTypeDM = {
  ...savingAccountTypeDataDomain,
  list: convertDomainToList(savingAccountTypeDataDomain),
  options: convertDomainToOptions(savingAccountTypeDataDomain),
  valueOf: savingAccountTypeDMValueOf,
};

export { savingAccountTypeDM };
