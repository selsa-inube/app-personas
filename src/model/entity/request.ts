import { TagProps } from "@design/data/Tag";
import { IValidation } from "./service";

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
  nominalRate: number;
  amortizationType: string;
  interestPaymentPeriod: string;
  periodicity: string;
  quotaValue: number;
  amountToTurn: number;
  requestDate: Date;
}

interface IRequirementRequestResponse {
  validations: IValidation[];
  documents: IValidation[];
}

interface IRequest {
  id: string;
  title: string;
  product: string;
  destination: string;
  trackingCode: string;
  requestDate: Date;
  description: string;
  status: string;
  value: number;
  quotaValue: number;
  periodicity: string;
  deadline: string;
  interestRate: number;
  netValue: number;
  tag: TagProps;
  validations: IValidation[];
  documentaryRequirements: IValidation[];
}

export type { IRequest, IRequirementRequest, IRequirementRequestResponse };
