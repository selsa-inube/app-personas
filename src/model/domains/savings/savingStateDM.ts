import { convertDomainToList, convertDomainToOptions } from "../helper";

const savingStateDataDomain = {
  ACTIVE: {
    id: "Active",
    value: "Activo",
  },
  INACTIVE: {
    id: "Inactive",
    value: "Inactivo",
  },
  CANCELLED: {
    id: "Cancelled",
    value: "Cancelado",
  },
};

const savingStateDMValueOf = (id: string) =>
  convertDomainToOptions(savingStateDataDomain).find(
    (value) => value.id === id,
  );

const savingStateDM = {
  ...savingStateDataDomain,
  list: convertDomainToList(savingStateDataDomain),
  options: convertDomainToOptions(savingStateDataDomain),
  valueOf: savingStateDMValueOf,
};

export { savingStateDM };
