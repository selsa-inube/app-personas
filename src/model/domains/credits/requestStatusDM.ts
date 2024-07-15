import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const requestStatusDataDomain = {
  CREATED: {
    id: "Created",
    value: "Recibida",
  },
  IN_STUDY: {
    id: "InStudy",
    value: "En estudio",
  },
  IN_PROGRESS: {
    id: "InProgress",
    value: "En proceso",
  },
  IN_DISBURSEMENT: {
    id: "InDisbursement",
    value: "En desembolso",
  },
  COMPLETED: {
    id: "Completed",
    value: "Completado",
  },
  REJECTED: {
    id: "Rejected",
    value: "Cancelado",
  },
};

const requestStatusDMValueOf = (id: string) =>
  convertDomainToOptions(requestStatusDataDomain).find(
    (value) => value.id === id,
  );

const requestStatusDM = {
  ...requestStatusDataDomain,
  list: convertDomainToList(requestStatusDataDomain),
  options: convertDomainToOptions(requestStatusDataDomain),
  valueOf: requestStatusDMValueOf,
};

export { requestStatusDM };
