import {
  IPaymentRequest,
  IPaymentRequestResponse,
} from "src/model/entity/payment";

const mapPaymentRequestApiToEntity = (
  paymentRequest: Record<string, string | number | object>,
): IPaymentRequestResponse => {
  const causes = paymentRequest.causas;
  let state = "";
  let message = "";

  if (Array.isArray(causes)) {
    state = String(causes[0].id);
    message = String(causes[0].message);
  }
  return {
    trackingCode: String(paymentRequest.trackingCode),
    url: String(paymentRequest.url),
    state,
    message,
  };
};

const mapPaymentRequestEntityToApi = (
  paymentRequest: IPaymentRequest,
): Record<string, string | number | object> => {
  return {
    clientCode: paymentRequest.customerCode,
    clientName: paymentRequest.customerName,
    descriptionPayment: paymentRequest.comments || "xxxx",
    productList: paymentRequest.payments.map((payment) => ({
      productCode: payment.id,
      productName: payment.title,
      valor: payment.valueToPay,
      action:
        payment.applyPayOption?.id ||
        payment.options.find((option) => option.selected)?.id,
    })),
    urlRedirect: paymentRequest.urlRedirect,
    wayToPay: paymentRequest.paymentMethod.map((moneySource) => ({
      paymentMethoName: moneySource.label,
      paymentMethodCode: moneySource.type,
      value: moneySource.value,
      savingProductNumber:
        moneySource.type === "SAVINGACCOUNT" ? moneySource.id : undefined,
    })),
  };
};

export { mapPaymentRequestApiToEntity, mapPaymentRequestEntityToApi };
