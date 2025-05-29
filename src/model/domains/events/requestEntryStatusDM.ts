import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const requestEntryStatusDataDomain = {
  RECEIVED: {
    id: "Received",
    value: "Recibida",
  },
  FILED: {
    id: "Filed",
    value: "Radicada",
  },
  PENDING_REQUIREMENTS: {
    id: "PendingRequirements",
    value: "Reservando",
  },
  COMPLETED: {
    id: "Finished",
    value: "Confirmado",
  },
  CANCELLED: {
    id: "Cancelled",
    value: "Cancelado",
  },
  COLLECTPENDING: {
    id: "CollectPending",
    value: "Procesando pago",
  },
};

const requestEntryStatusDMValueOf = (id: string) =>
  Object.values(requestEntryStatusDataDomain).find((item) => item.id === id);

const requestEntryStatusDM = {
  ...requestEntryStatusDataDomain,
  list: convertDomainToList(requestEntryStatusDataDomain),
  options: convertDomainToOptions(requestEntryStatusDataDomain),
  valueOf: requestEntryStatusDMValueOf,
};

export { requestEntryStatusDM };
