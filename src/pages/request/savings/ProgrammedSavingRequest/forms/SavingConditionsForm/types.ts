import { ISelectOption } from "@design/input/Select/types";
import { IPeriodicity } from "src/model/entity/periodicity";

interface ISavingConditionsEntry {
  deadline?: number;
  quota?: number;
  savingAmount: number;
  yields: number;
  withholdingTax: number;
  gmf: number;
  netValue: number;
  annualRate: number;
  hasResult: boolean;
  paymentMethod?: ISelectOption;
  paymentMethods: ISelectOption[];
  periodicity: IPeriodicity;
  periodicities: IPeriodicity[];
  transferBankEntity?: string;
  transferAccountType?: string;
  transferAccountNumber?: string;
}

export type { ISavingConditionsEntry };
