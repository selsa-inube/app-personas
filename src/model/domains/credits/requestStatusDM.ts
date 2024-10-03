import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const requestStatusDataDomain = {
  RECEIVED: {
    id: "Received",
    value: "Recibida",
  },
  FILED: {
    id: "Filed",
    value: "Radicada",
  },
  IN_STUDY: {
    id: "InStudy",
    value: "En estudio",
  },
  APPROVED: {
    id: "Approved",
    value: "Completado",
  },
  REJECTED: {
    id: "Rejected",
    value: "Rechazada",
  },
  IN_DISBURSEMENT: {
    id: "InDisbursement",
    value: "En desembolso",
  },
  COMPLETED: {
    id: "Finished",
    value: "Completado",
  },
  CANCELLED: {
    id: "Cancelled",
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
