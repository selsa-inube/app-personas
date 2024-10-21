import { ISelectOption } from "@design/input/Select/types";

interface IDestinationProduct {
  id: string;
  title: string;
  description: string;
  maxRate?: number;
  maxDeadline?: number;
  maxAmount: number;
  minAmount: number;
  maxAmountForUser: number;
  amortizationType: string;
}

interface IDestinationEntry {
  destinations: ISelectOption[];
  destination?: ISelectOption;
  products: IDestinationProduct[];
  product?: IDestinationProduct;
}

export type { IDestinationEntry, IDestinationProduct };
