import {
  paymentStatusAppearanceMock,
  paymentStatusValuesMock,
  paymentTitleValuesMock,
} from "@mocks/payments/utils.mocks";
import { paymentOptionValues } from "@pages/admin/payments/Pay/config/mappers";
import { IPaymentHistory, IProductPayment } from "src/model/entity/payment";

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
    title: paymentTitleValuesMock[String(payment.paymentSource)],
    value: Number(payment.totalValuePaid),
    paymentDate: new Date(String(payment.payDay)),
    paymentMethod,
    cus: String(payment.cus),
    tag: {
      label: paymentStatusValuesMock[String(payment.paymentStatus)],
      appearance: paymentStatusAppearanceMock[String(payment.paymentStatus)],
      textAppearance:
        paymentStatusAppearanceMock[String(payment.paymentStatus)],
      modifier: "clear",
    },
    products,
  };
};

const mapPaymentHistoryApiToEntities = (
  paymentHistory: Record<string, string | number | object>[],
): IPaymentHistory[] => {
  return paymentHistory
    .map((payment) => mapPaymentHistoryApiToEntity(payment))
    .sort((a, b) => b.paymentDate.getTime() - a.paymentDate.getTime());
};

export { mapPaymentHistoryApiToEntities, mapPaymentHistoryApiToEntity };
