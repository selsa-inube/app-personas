import { convertDomainToOptions, convertDomainToList } from "src/utils/domains";

const accountOriginType = {
  NEW: {
    id: "new",
    value: "Nueva",
  },
  REGISTERED: {
    id: "registered",
    value: "Registrada",
  },
};

const statusDMValueOf = (id: string) =>
  convertDomainToOptions(accountOriginType).find((status) => status.id === id);

const accountOriginTypeDM = {
  ...accountOriginType,
  list: convertDomainToList(accountOriginType),
  options: convertDomainToOptions(accountOriginType),
  valueOf: statusDMValueOf,
};

export { accountOriginTypeDM };
