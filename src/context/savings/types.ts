import { IProduct } from "src/model/entity/product";

interface ISavingsState {
  savingsAccounts: IProduct[];
  programmedSavings: IProduct[];
  savingsContributions: IProduct[];
  cdats: IProduct[];
}

interface ISavingsContext {
  savings: ISavingsState;
  setSavings: React.Dispatch<React.SetStateAction<ISavingsState>>;
}

export type { ISavingsContext, ISavingsState };
