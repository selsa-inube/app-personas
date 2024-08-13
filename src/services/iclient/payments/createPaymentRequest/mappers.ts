import { EMoneySourceType } from "@pages/admin/payments/Pay/forms/PaymentMethodForm/types";
import { IPaymentRequest, IPaymentRequestResponse } from "./types";

const mapPaymentRequestEntityToApi = (
  paymentRequest: IPaymentRequest,
): Record<string, string | number | object> => {
  const paymentDate = new Date();

  return {
    clientCode: paymentRequest.customerCode,
    clientName: paymentRequest.customerName,
    descriptionPayment: paymentRequest.comments,
    productList: paymentRequest.payments.map((payment) => ({
      productCode: payment.id,
      productName: payment.title,
      value: payment.valueToPay,
      action:
        payment.applyPayOption?.id ||
        payment.options.find((option) => option.selected)?.id,
      supportDocumentType: payment.supportDocumentType,
      productGroupType: payment.group,
    })),
    urlRedirect: paymentRequest.urlRedirect,
    wayToPay: paymentRequest.paymentMethod.map((moneySource) => ({
      paymentMethodName: moneySource.label,
      paymentMethodCode: moneySource.type,
      value: moneySource.value,
      savingProductNumber:
        moneySource.type === EMoneySourceType.SAVINGACCOUNT
          ? moneySource.id
          : undefined,
    })),
    paymentSource: paymentRequest.source,
    paymentDate: paymentDate.toISOString(),
  };
};

const mapPaymentRequestApiToEntity = (
  paymentRequest: Record<string, string | number | object>,
): IPaymentRequestResponse => {
  const causes = paymentRequest.causas;
  let state = "";
  let message = "";

  if (causes && Array.isArray(causes)) {
    state = String(causes[0].id);
    message = String(causes[0].message);
  }

  return {
    trackingCode: String(paymentRequest.trackingCode),
    url: paymentRequest.url ? String(paymentRequest.url) : undefined,
    state,
    message,
  };
};

export { mapPaymentRequestApiToEntity, mapPaymentRequestEntityToApi };
