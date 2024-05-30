interface IPaymentOptionRequest {
  payValue: number;
  totalExpiredValue: number;
  creditLine: string;
  halfPayment: string;
  nextExpirationDate: string;
  nextValueExpiration: number;
  obligationNumber: string;
  paymentDate: string;
}

interface IPaymentOptionRequestResponse {
  isValid: string;
  optionList: { code: string; description: string }[];
}

export type { IPaymentOptionRequest, IPaymentOptionRequestResponse };
