interface ISimulateCreditRequest {
  productId: string;
  paymentMethodId: string;
  userIdentification: string;
  amount: number;
  periodicityInMonths: number;
  deadline: number;
  quota: number;
  simulationParameter: string;
  extraordinaryQuotas?: {
    quotas: number;
    valuePerQuota: number;
  };
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
  charges: { name: string; value: number }[];
  discounts: { name: string; value: number }[];
  periodicity: string;
  netValue: number;
}

export type { ISimulateCreditRequest, ISimulateCreditResponse };
