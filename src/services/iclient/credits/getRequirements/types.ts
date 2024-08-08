import { IValidation } from "src/model/entity/service";

interface IRequirementRequest {
  productId: string;
  productName: string;
  destinationId: string;
  destinationName: string;
  customerCode: string;
  customerName: string;
  paymentMethodCode: string;
  paymentMethodName: string;
  requestAmount: number;
  creditAmount: number;
  capitalPaymentPeriod: string;
  numQuotas: number;
  nominalRate: string;
  amortizationType: string;
  interestPaymentPeriod: string;
  periodicity: string;
  quotaValue: number;
  amountToTurn: number;
}

interface IRequirementResponse {
  validations: IValidation[];
  documents: IValidation[];
}

export type { IRequirementRequest, IRequirementResponse };
