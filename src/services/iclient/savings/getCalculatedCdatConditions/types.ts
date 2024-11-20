interface ICalculatedCdatConditionsRequest {
  userIdentification: string;
  productId: string;
  deadline: number;
  investmentValue: number;
}

interface ICalculatedCdatConditionsResponse {
  expirationDate: Date;
  rate: number;
  returns: number;
  withholdingTax: number;
}

export type {
  ICalculatedCdatConditionsRequest,
  ICalculatedCdatConditionsResponse,
};
