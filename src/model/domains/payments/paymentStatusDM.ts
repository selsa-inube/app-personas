import { convertDomainToOptions, convertDomainToList } from "../helper";

const paymentStatusDataDomain = {
  IN_PROGRESS_PSE: {
    id: "en_tramite_con_pse",
    value: "En progreso",
  },
  REJECTED_PSE: {
    id: "pago_pse_abortado",
    value: "Rechazado",
  },
  IN_PROGRESS: {
    id: "pago_recibido_en_proceso_de_aplicacion",
    value: "En progreso",
  },
  COMPLETED: {
    id: "pago_finalizado",
    value: "Completado",
  },
  REJECTED: {
    id: "pago_no_satisfactorio",
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
