interface ICalculatedConditionsRequest {
  productId: string;
  paymentMethodId: string;
  customerCode: string;
  amount: number;
}

interface ICalculatedConditionsRequestResponse {
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
  ICalculatedConditionsRequestResponse,
};
