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
  let httpStatus = 500;

  if (Array.isArray(causes)) {
    state = String(causes[0].id);
    message = String(causes[0].mensaje);
    httpStatus = Number(causes[0].estadoHttp);
  }
  return {
    codeTracking: String(paymentRequest.codigoSeguimiento),
    url: String(paymentRequest.url),
    state,
    message,
    httpStatus,
  };
};

const mapPaymentRequestEntityToApi = (
  paymentRequest: IPaymentRequest,
): Record<string, string | number | object> => {
  return {
    client_code: paymentRequest.customerCode,
    client_name: paymentRequest.customerName,
    description_payment: paymentRequest.comments,
    product_list: paymentRequest.payments.map((payment) => ({
      product_name: payment.id,
      payment_value: payment.valueToPay,
      extraordinary_payment_decision: payment.applyPayOption?.id,
    })),
    way_to_pay: paymentRequest.paymentMethod.map((moneySource) => ({
      code: moneySource.type,
      payment_value: moneySource.value,
      savings_account_number:
        moneySource.type === "savingAccount" ? moneySource.id : "",
    })),
    url_redirection_commerce: paymentRequest.urlRedirect,
  };
};

export { mapPaymentRequestApiToEntity, mapPaymentRequestEntityToApi };
