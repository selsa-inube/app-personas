import { convertDomainToList, convertDomainToOptions } from "../helper";

const transferSourceDataDomain = {
  SAVING_ACCOUNT: {
    id: "SavingAccount",
    value: "Cuenta de ahorros",
  },
  PSE: {
    id: "PSE",
    value: "PSE",
  },
};

const transferSourceDMValueOf = (id: string) =>
  convertDomainToOptions(transferSourceDataDomain).find(
    (value) => value.id === id,
  );

const transferSourceDM = {
  ...transferSourceDataDomain,
  list: convertDomainToList(transferSourceDataDomain),
  options: convertDomainToOptions(transferSourceDataDomain),
  valueOf: transferSourceDMValueOf,
};

export { transferSourceDM };
