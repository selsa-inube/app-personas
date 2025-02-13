import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const paymentStatusDataDomain = {
  IN_PROGRESS_PSE: {
    id: "InProgressPSE",
    value: "En progreso",
  },
  REJECTED_PSE: {
    id: "RejectedPSE",
    value: "Rechazado",
  },
  IN_PROGRESS: {
    id: "InProgressLinix",
    value: "En progreso",
  },
  REJECTED_LINIX: {
    id: "RejectedLinix",
    value: "Rechazado",
  },
  COMPLETED: {
    id: "Completed",
    value: "Completado",
  },
  STUCK_IN_PSE: {
    id: "StuckInPSE",
    value: "En progreso",
  },
  BLOCKED_IN_PSE: {
    id: "BlockedInPSE",
    value: "En progreso",
  },
};

const paymentStatusDMValueOf = (id: string) =>
  Object.values(paymentStatusDataDomain).find((value) => value.id === id);

const paymentStatusDM = {
  ...paymentStatusDataDomain,
  list: convertDomainToList(paymentStatusDataDomain),
  options: convertDomainToOptions(paymentStatusDataDomain),
  valueOf: paymentStatusDMValueOf,
};

export { paymentStatusDM };
