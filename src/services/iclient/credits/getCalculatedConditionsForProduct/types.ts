interface ICalculatedConditionsRequest {
  productId: string;
  paymentMethodId: string;
  customerCode: string;
  amount: number;
}

interface ICalculatedConditionsResponse {
  productId: string;
  paymentMethodId: string;
  customerCode: string;
  amount: number;
  cutOffDate: string;
  deadline: number;
  rate: number;
}

export type {
  ICalculatedConditionsRequest,
  ICalculatedConditionsResponse,
};
