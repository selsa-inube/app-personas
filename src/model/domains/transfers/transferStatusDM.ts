import { convertDomainToList, convertDomainToOptions } from "../helper";

const transferStatusDataDomain = {
  IN_PROGRESS_PSE: {
    id: "inProgressPSE",
    value: "En progreso",
  },
  REJECTED_PSE: {
    id: "rejectedPse",
    value: "Rechazado",
  },
  IN_PROGRESS: {
    id: "inProgress",
    value: "En progreso",
  },
  COMPLETED: {
    id: "completed",
    value: "Completado",
  },
  REJECTED: {
    id: "rejected",
    value: "Rechazado",
  },
};

const transferStatusDMValueOf = (id: string) =>
  convertDomainToOptions(transferStatusDataDomain).find(
    (value) => value.id === id,
  );

const transferStatusDM = {
  ...transferStatusDataDomain,
  list: convertDomainToList(transferStatusDataDomain),
  options: convertDomainToOptions(transferStatusDataDomain),
  valueOf: transferStatusDMValueOf,
};

export { transferStatusDM };
