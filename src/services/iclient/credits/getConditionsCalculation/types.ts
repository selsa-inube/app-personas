interface IConditionRequest {
  productId: string;
  paymentMethodId: string;
  customerCode: string;
  amount: number;
}

interface IConditionRequestResponse {
  productId: string;
  paymentMethodId: string;
  customerCode: string;
  amount: number;
  cutOffDate: string;
  deadline: number;
  rate: number;
}

export type { IConditionRequest, IConditionRequestResponse };
