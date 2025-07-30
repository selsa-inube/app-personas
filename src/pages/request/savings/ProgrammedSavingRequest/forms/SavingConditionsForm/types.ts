import { IOption } from "@inubekit/inubekit";
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
  paymentMethod?: IOption;
  paymentMethods: IOption[];
  periodicity: IPeriodicity;
  periodicities: IPeriodicity[];
  transferBankEntity?: string;
  transferAccountType?: string;
  transferAccountNumber?: string;
  numQuotas: number;
}

export type { ISavingConditionsEntry };
