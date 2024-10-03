interface ISimulateCreditRequest {
  productId: string;
  paymentMethodId: string;
  userIdentification: string;
  amount: number;
  periodicityInMonths: number;
  deadline: number;
  quota: number;
  simulationParameter: string;
}

interface ISimulateCreditResponse {
  productId: string;
  paymentMethodId: string;
  userIdentification: string;
  amount: number;
  cutOffDate: string;
  periodicityInMonths: number;
  rate: number;
  quota: number;
  deadline: number;
  anticipatedInterest: number;
  chargeName: string;
  discountName: string;
  chargeValue: number;
  discountValue: number;
  netValue: number;
}

export type { ISimulateCreditRequest, ISimulateCreditResponse };
