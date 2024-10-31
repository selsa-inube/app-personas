import { ISelectOption } from "@design/input/Select/types";

interface ICreditDestinationProduct {
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
  products: ICreditDestinationProduct[];
  product?: ICreditDestinationProduct;
}

export type { ICreditDestinationProduct, IDestinationEntry };
