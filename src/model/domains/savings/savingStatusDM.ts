import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const savingStatusDataDomain = {
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

const savingStatusDMValueOf = (id: string) =>
  convertDomainToOptions(savingStatusDataDomain).find(
    (value) => value.id === id,
  );

const savingStatusDM = {
  ...savingStatusDataDomain,
  list: convertDomainToList(savingStatusDataDomain),
  options: convertDomainToOptions(savingStatusDataDomain),
  valueOf: savingStatusDMValueOf,
};

export { savingStatusDM };
