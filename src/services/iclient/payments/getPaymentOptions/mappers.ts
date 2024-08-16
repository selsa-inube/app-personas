import { IPaymentOptionRequest, IPaymentOptionResponse } from "./types";

const mapPaymentOptionsEntityToEntity = (
  paymentOption: Record<string, string | object>,
): IPaymentOptionResponse => {
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
  paymentOption: IPaymentOptionRequest,
): Record<string, string | number> => {
  return {
    payValue: paymentOption.payValue,
    totalExpiredValue: paymentOption.totalExpiredValue,
    creditLine: paymentOption.creditLine,
    halfPayment: paymentOption.halfPayment,
    nextExpirationDate: paymentOption.nextExpirationDate,
    nextValueExpiration: paymentOption.nextValueExpiration,
    obligationNumber: paymentOption.obligationNumber,
    paymentDate: paymentOption.paymentDate,
  };
};

export { mapPaymentOptionsEntityToApi, mapPaymentOptionsEntityToEntity };
