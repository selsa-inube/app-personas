import { ISelectOption } from "@design/input/Select/types";
import { IDestinationProduct } from "../DestinationForm/types";

interface IDisbursementModalState {
  show: boolean;
  data?: {
    spec: {
      amount: number;
      cycleInterest: number;
      discounts: number;
    };
    approximateValue: number;
  };
}

interface ICreditConditionsEntry {
  creditDestination?: ISelectOption;
  product: IDestinationProduct;
  simulationWithQuota: boolean;
  amount: number;
  periodicity: string;
  deadline: string;
  quota: number;
  cycleInterest: number;
  discounts: number;
  minWarrantyRequired: string;
  netValue: number;
  interestRate: string;
  hasResult: boolean;
}

export type { ICreditConditionsEntry, IDisbursementModalState };
