import { ISelectOption } from "@design/input/Select/types";
import { IDestinationProduct } from "../DestinationForm/types";
import { IPeriodicity } from "src/model/entity/periodicity";

interface IDisbursementModalState {
  show: boolean;
  data?: {
    spec: {
      amount: number;
      cycleInterest: number;
      discounts: number;
      charges: number;
    };
    approximateValue: number;
  };
}

interface ICreditConditionsEntry {
  creditDestination?: ISelectOption;
  product: IDestinationProduct;
  simulationWithQuota: boolean;
  amount: number;
  deadline: string;
  deadlineTerm: string;
  quota: number;
  cycleInterest: number;
  discounts: number;
  minWarrantyRequired: string;
  netValue: number;
  interestRate: string;
  hasResult: boolean;
  paymentMethod?: ISelectOption;
  paymentMethods: ISelectOption[];
  periodicity: IPeriodicity;
  periodicities: IPeriodicity[];
  periodicityInMonths: number;
  rate: number;
  charges: number;
  calculatedQuotaValue: number;
  quotaDeadlineInMonths: string;
  calculatedQuotaDeadline: number;
}

export type { ICreditConditionsEntry, IDisbursementModalState };
