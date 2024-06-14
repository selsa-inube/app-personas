import { convertDomainToList, convertDomainToOptions } from "../helper";

const paymentStatusDataDomain = {
  IN_PROGRESS_PSE: {
    id: "InProgressPSE",
    value: "En progreso",
  },
  REJECTED_PSE: {
    id: "RejectedPse",
    value: "Rechazado",
  },
  IN_PROGRESS: {
    id: "InProgressLinix",
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

const paymentStatusDMValueOf = (id: string) =>
  convertDomainToOptions(paymentStatusDataDomain).find(
    (value) => value.id === id,
  );

const paymentStatusDM = {
  ...paymentStatusDataDomain,
  list: convertDomainToList(paymentStatusDataDomain),
  options: convertDomainToOptions(paymentStatusDataDomain),
  valueOf: paymentStatusDMValueOf,
};

export { paymentStatusDM };
