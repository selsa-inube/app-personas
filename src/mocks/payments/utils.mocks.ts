import { TagAppearanceType } from "@design/data/Tag/types";

const paymentTitleValuesMock: Record<string, string> = {
  preliquidacion_web: "Pago PRE-LIQUIDACIÓN WEB",
  apertura_cdat: "Apertura de CDAT",
  inscripcion_eventos: "Inscripción de eventos",
  deposito_externo_ahorros: "Depósito externo a cuenta de ahorros",
};

const paymentStatusValuesMock: Record<string, string> = {
  en_tramite_con_pse: "En progreso PSE",
  pago_pse_abortado: "Abandonado",
  pago_recibido_en_proceso_de_aplicacion: "En progreso",
  pago_finalizado: "Completado",
  pago_no_satisfactorio: "Rechazado",
};

const paymentStatusAppearanceMock: Record<string, TagAppearanceType> = {
  en_tramite_con_pse: "warning",
  pago_pse_abortado: "error",
  pago_recibido_en_proceso_de_aplicacion: "warning",
  pago_finalizado: "success",
  pago_no_satisfactorio: "error",
};

export {
  paymentStatusAppearanceMock,
  paymentStatusValuesMock,
  paymentTitleValuesMock,
};
