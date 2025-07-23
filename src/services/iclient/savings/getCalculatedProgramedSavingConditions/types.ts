interface ICalculatedProgramedSavingConditionsRequest {
  paymentMethod: string;
  userIdentification: string;
  productId: string;
  periodicity: string;
  deadlineType: string;
  deadline: number;
  quotaValue: number;
}

interface ICalculatedProgramedSavingConditionsResponse {
  netValue: number;
  returns: number;
  withholdingTax: number;
  gmf: number;
  disbursement: number;
  rate: number;
}

export type {
  ICalculatedProgramedSavingConditionsRequest,
  ICalculatedProgramedSavingConditionsResponse,
};
