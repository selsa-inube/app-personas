import { IPaymentOptionRequest, IPaymentOptionRequestResponse } from "./types";

const mapPaymentOptionsEntityToEntity = (
  paymentOption: Record<string, string | object>,
): IPaymentOptionRequestResponse => {
  const options = paymentOption.paymentOptions;
  const optionArray =
    Array.isArray(options) &&
    options.map((option) => ({
      code: option.code || "",
      description: option.description || "",
    }));

  return {
    isValid: String(paymentOption.indicatesValidPayment),
    optionList: optionArray || [],
  };
};

const mapPaymentOptionsEntityToApi = (
  payment: IPaymentOptionRequest,
): Record<string, string | number> => {
  return {
    payValue: payment.payValue,
    totalExpiredValue: payment.totalExpiredValue,
    creditLine: payment.creditLine,
    halfPayment: payment.halfPayment,
    nextExpirationDate: payment.nextExpirationDate,
    nextValueExpiration: payment.nextValueExpiration,
    obligationNumber: payment.obligationNumber,
    paymentDate: payment.paymentDate,
  };
};

export { mapPaymentOptionsEntityToEntity, mapPaymentOptionsEntityToApi };
