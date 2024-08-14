import { ISelectOption } from "@design/input/Select/types";

interface IDestinationProduct {
  id: string;
  title: string;
  description: string;
  maxRate?: number;
  maxDeadline?: number;
  maxAmount: number;
  amortizationType: string;
}

interface IDestinationEntry {
  destinations: ISelectOption[];
  creditDestination?: ISelectOption;
  products: IDestinationProduct[];
  selectedProduct?: IDestinationProduct;
}

export type { IDestinationEntry, IDestinationProduct };
