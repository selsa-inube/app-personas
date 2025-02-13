import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const pqrsStatusDataDomain = {
  PENDING_CLASSIFICATION: {
    id: "PendingClassification",
    value: "Pendiente de clasificación",
  },
  RESOLVED: {
    id: "Resolved",
    value: "Resuelto",
  },
  FINISHED: {
    id: "Finished",
    value: "Finalizado",
  },
  RECEIVED: {
    id: "Received",
    value: "Recibido",
  },
  IN_PROCESS: {
    id: "InProcess",
    value: "En proceso",
  },
  REOPEN_INCIDENT: {
    id: "ReopenIncident",
    value: "Incidente reabierto",
  },
};

const pqrsStatusDMValueOf = (id: string) =>
  Object.values(pqrsStatusDataDomain).find((value) => value.id === id);

const pqrsStatusDM = {
  ...pqrsStatusDataDomain,
  list: convertDomainToList(pqrsStatusDataDomain),
  options: convertDomainToOptions(pqrsStatusDataDomain),
  valueOf: pqrsStatusDMValueOf,
};

export { pqrsStatusDM };
