import { convertDomainToList, convertDomainToOptions } from "../helper";

const statusData = {
    NEW: {
      id: "new",
      value: "Nuevo",
    },
    REGISTERED: {
      id: "registred",
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