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

  return {
    id: String(payment.paymentId),
    title: String(payment.descriptionPayment),
    value: Number(payment.totalValuePaid),
    paymentDate: new Date(String(payment.payDay)),
    paymentType: String(payment.paymentSource),
    cus: String(payment.cus),
    tag: {
      label: String(payment.paymentStatus),
      appearance: "warning",
      textAppearance: "warning",
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
