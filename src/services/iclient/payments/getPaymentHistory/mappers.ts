import { TagAppearanceType } from "@design/data/Tag/types";
import { paymentOptionValues } from "@pages/admin/payments/Pay/config/mappers";
import { paymentStatusDM } from "src/model/domains/payments/paymentStatusDM";
import { IPaymentHistory, IProductPayment } from "src/model/entity/payment";

const paymentTitleValues: Record<string, string> = {
  preliquidacion_web: "Pago PRE-LIQUIDACIÓN WEB",
  apertura_cdat: "Apertura de CDAT",
  inscripcion_eventos: "Inscripción de eventos",
  deposito_externo_ahorros: "Depósito externo a cuenta de ahorros",
};

const paymentStatusAppearance: Record<string, TagAppearanceType> = {
  en_tramite_con_pse: "warning",
  pago_pse_abortado: "error",
  pago_recibido_en_proceso_de_aplicacion: "warning",
  pago_finalizado: "success",
  pago_no_satisfactorio: "error",
};

const mapPaymentHistoryApiToEntity = (
  payment: Record<string, string | number | object>,
): IPaymentHistory => {
  const products: IProductPayment[] = [];

  if (Array.isArray(payment.productList)) {
    payment.productList.forEach((product) => {
      if (product.productName && product.productCode && product.value) {
        products.push({
          productName: String(product.productName),
          productNumber: String(product.productCode),
          valueToPay: Number(product.value),
          applyPayment: paymentOptionValues[String(product.action)],
        });
      }
    });
  }

  const paymentMethods = Array.isArray(payment.wayToPay)
    ? payment.wayToPay.filter((way) => way.paymentMethodName)
    : [];

  const paymentMethod =
    paymentMethods.length > 1
      ? "Múltiples fuentes de dinero"
      : paymentMethods.length > 0
        ? paymentMethods[0].paymentMethodName
        : "";

  return {
    id: String(payment.paymentId),
    title: paymentTitleValues[String(payment.paymentSource)],
    value: Number(payment.totalValuePaid),
    paymentDate: new Date(String(payment.payDay)),
    paymentMethod,
    cus: String(payment.cus),
    tag: {
      label:
        paymentStatusDM.valueOf(String(payment.paymentStatus))?.value || "",
      appearance: paymentStatusAppearance[String(payment.paymentStatus)],
      textAppearance: paymentStatusAppearance[String(payment.paymentStatus)],
      modifier: "clear",
    },
    products,
  };
};

const mapPaymentsHistoryApiToEntities = (
  paymentHistory: Record<string, string | number | object>[],
): IPaymentHistory[] => {
  return paymentHistory.map((payment) => mapPaymentHistoryApiToEntity(payment));
};

export { mapPaymentsHistoryApiToEntities, mapPaymentHistoryApiToEntity };
