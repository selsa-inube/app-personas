import { IExtraPaymentRequest, IExtraPaymentResponse } from "./types";

const mapExtraPaymentEntityToApi = (
  values: IExtraPaymentRequest,
): Record<string, string | number> => {
  const data: Record<string, string | number> = {
    amount: values.amount,
    customerCode: values.customerCode,
    paymentMethodId: values.paymentMethodId,
    periodicityInMonths: values.periodicityInMonths,
    productId: values.productId,
    simulationParameter: values.simulationParameter,
  };

  if (values.numQuotas) {
    data.numQuotas = values.numQuotas;
  } else if (values.quotaValue) {
    data.quotaValue = values.quotaValue;
  }

  return data;
};

const mapExtraPaymentApiToEntity = (
  values: Record<string, string | object>,
): IExtraPaymentResponse => {
  return {
    allowExtraPayment: Boolean(values.allowExtraPayment),
    maxQuotas: Number(values.maxQuotas),
    percentageExtraPayment: Number(values.percentageExtraPayment),
  };
};

export { mapExtraPaymentApiToEntity, mapExtraPaymentEntityToApi };
