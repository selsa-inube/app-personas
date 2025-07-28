import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const transferSourceDataDomain = {
  SAVING_ACCOUNT: {
    id: "SavingAccount",
    value: "Cuenta de ahorros",
  },
  PSE: {
    id: "PAGOPSE",
    value: "PSE",
  },
};

const transferSourceDMValueOf = (id: string) =>
  Object.values(transferSourceDataDomain).find((value) => value.id === id);

const transferSourceDM = {
  ...transferSourceDataDomain,
  list: convertDomainToList(transferSourceDataDomain),
  options: convertDomainToOptions(transferSourceDataDomain),
  valueOf: transferSourceDMValueOf,
};

export { transferSourceDM };
