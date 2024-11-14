import { IValidation } from "src/model/entity/service";

interface IMoneySourceValid {
  accountNumber?: string;
  type: string;
  detail?: string;
  value: number;
}

interface ISystemValidationsEntry {
  validations: IValidation[];
  documents: IValidation[];
  productId: string;
  productName: string;
  amount: number;

  destinationId?: string;
  destinationName?: string;
  paymentMethod?: string;
  paymentMethodName?: string;
  periodicity?: string;
  deadline?: number;
  rate?: number;
  amortizationType?: string;
  quota?: number;
  netValue?: number;
}

export type { IMoneySourceValid, ISystemValidationsEntry };
