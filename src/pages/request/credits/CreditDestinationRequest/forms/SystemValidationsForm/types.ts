import { IValidation } from "src/model/entity/service";

interface ISystemValidationsEntry {
  validations: IValidation[];
  documents: IValidation[];
  productId: string;
  productName: string;
  destinationId: string;
  destinationName: string;
  paymentMethodCode: string;
  paymentMethodName: string;
  amount: number;
  periodicity: string;
  deadline: number;
  rate: number;
  amortizationType: string;
  quota: number;
  netValue: number;
}

export type { ISystemValidationsEntry };
