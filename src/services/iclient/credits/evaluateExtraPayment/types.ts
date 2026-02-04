interface IExtraPaymentRequest {
  amount: number;
  customerCode: string;
  paymentMethodId: string;
  periodicityInMonths: number;
  productId: string;
  numQuotas?: number;
  quotaValue?: number;
  simulationParameter: string;
}

interface IExtraPaymentResponse {
  allowExtraPayment: boolean;
  maxQuotas: number;
  percentageExtraPayment: number;
}

export type { IExtraPaymentRequest, IExtraPaymentResponse };
