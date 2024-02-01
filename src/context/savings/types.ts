import { IProduct } from "src/model/entity/product";

interface ISavingsContext {
  savings: IProduct[];
  setSavings: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export type { ISavingsContext };
