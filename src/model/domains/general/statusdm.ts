import { convertDomainToOptions, convertDomainToList } from "src/utils/domains";

const statusData = {
  NEW: {
    id: "new",
    value: "Nuevo",
  },
  REGISTERED: {
    id: "registered",
    value: "Registrado",
  },
};

const statusDMValueOf = (id: string) =>
  convertDomainToOptions(statusData).find((status) => status.id === id);

const statusDM = {
  ...statusData,
  list: convertDomainToList(statusData),
  options: convertDomainToOptions(statusData),
  valueOf: statusDMValueOf,
};

export { statusDM };
