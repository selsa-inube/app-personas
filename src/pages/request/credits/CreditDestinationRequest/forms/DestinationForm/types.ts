interface IDestinationProduct {
  id: string;
  title: string;
  description: string;
  maxRate: number;
  maxDeadline: number;
  maxAmount: number;
}

interface IDestinationEntry {
  creditDestination: string;
  products: IDestinationProduct[];
  selectedProduct?: IDestinationProduct;
}

export type { IDestinationEntry, IDestinationProduct };
