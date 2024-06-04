import { convertDomainToList, convertDomainToOptions } from "../helper";

const transferStatusDataDomain = {
  IN_PROGRESS_PSE: {
    id: "en_tramite_con_pse",
    value: "En progreso",
  },
  REJECTED_PSE: {
    id: "transferencia_pse_abortada",
    value: "Rechazado",
  },
  IN_PROGRESS: {
    id: "transferencia_recibida_en_proceso_de_aplicacion",
    value: "En progreso",
  },
  COMPLETED: {
    id: "transferencia_finalizada",
    value: "Completado",
  },
  REJECTED: {
    id: "transferencia_no_satisfactoria",
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
