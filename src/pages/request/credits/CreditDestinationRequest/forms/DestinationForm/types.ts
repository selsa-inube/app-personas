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
  publishStatus?: boolean;
}

interface IDestinationEntry {
  destinations: IOption[];
  destination?: IOption;
  products: ICreditDestinationProduct[];
  product?: ICreditDestinationProduct;
}

export type { ICreditDestinationProduct, IDestinationEntry };
