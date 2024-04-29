import {
  paymentStatusAppearanceMock,
  paymentStatusValuesMock,
  paymentTitleValuesMock,
} from "@mocks/payments/utils.mocks";
import { IPaymentHistory, IProductPayment } from "src/model/entity/payment";

const mapPaymentHistoryApiToEntity = (
  payment: Record<string, string | number | object>,
): IPaymentHistory => {
  const products: IProductPayment[] = [];

  if (Array.isArray(payment.productList)) {
    payment.productList.forEach((product) => {
      products.push({
        productName: String(product.productName),
        productNumber: String(product.productCode),
        valueToPay: Number(product.value),
        applyPayment: String(product.action),
      });
    });
  }

  const paymentMethod =
    Array.isArray(payment.wayToPay) && payment.wayToPay.length > 0
      ? payment.wayToPay.length === 1
        ? payment.wayToPay[0].paymentMethoName
        : "Múltiples fuentes de dinero"
      : "";

  return {
    id: String(payment.paymentId),
    title: paymentTitleValuesMock[Object(payment.paymentSource).code],
    value: Number(payment.totalValuePaid),
    paymentDate: new Date(String(payment.payDay)),
    paymentMethod,
    cus: String(payment.cus),
    tag: {
      label: paymentStatusValuesMock[Object(payment.paymentStatus).code],
      appearance:
        paymentStatusAppearanceMock[Object(payment.paymentStatus).code],
      textAppearance:
        paymentStatusAppearanceMock[Object(payment.paymentStatus).code],
      modifier: "clear",
    },
    products,
  };
};

const mapPaymentHistoryApiToEntities = (
  paymentHistory: Record<string, string | number | object>[],
): IPaymentHistory[] => {
  return paymentHistory.map((payment) => mapPaymentHistoryApiToEntity(payment));
};

export { mapPaymentHistoryApiToEntities, mapPaymentHistoryApiToEntity };
