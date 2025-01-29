import { IOption } from "@inubekit/inubekit";

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
  destinations: IOption[];
  destination?: IOption;
  products: ICreditDestinationProduct[];
  product?: ICreditDestinationProduct;
}

export type { ICreditDestinationProduct, IDestinationEntry };
