import { convertDomainToList, convertDomainToOptions } from "../helper";

const transferStatusDataDomain = {
  IN_PROGRESS_PSE: {
    id: "InProgressPSE",
    value: "En progreso",
  },
  REJECTED_PSE: {
    id: "RejectedPse",
    value: "Rechazado",
  },
  IN_PROGRESS: {
    id: "InProgress",
    value: "En progreso",
  },
  COMPLETED: {
    id: "Completed",
    value: "Completado",
  },
  REJECTED: {
    id: "Rejected",
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
