interface IProgrammedSavingProduct {
  id: string;
  title: string;
  maxRate: number;
  minDeadline: number;
  maxDeadline: number;
  minQuota: number;
  maxQuota: number;
  deadlineType: "Discretional" | "Fixed";
}

interface IDestinationEntry {
  products: IProgrammedSavingProduct[];
  product?: IProgrammedSavingProduct;
}

export type { IDestinationEntry, IProgrammedSavingProduct };
