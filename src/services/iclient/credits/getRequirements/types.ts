import { IValidation } from "src/model/entity/service";

interface IRequirementRequest {
  productId: string;
  productName: string;
  destinationId: string;
  destinationName: string;
  customerCode: string;
  customerName: string;
  paymentMethod: string;
  paymentMethodName: string;
  amount: number;
  deadline: number;
  rate: number;
  amortizationType: string;
  interestPaymentPeriod: string;
  periodicity: string;
  quota: number;
  netValue: number;
  requestDate: Date;
}

interface IRequirementResponse {
  validations: IValidation[];
  documents: IValidation[];
}

export type { IRequirementRequest, IRequirementResponse };
