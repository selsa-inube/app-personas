import { ICommitment, IProduct } from "src/model/entity/product";

interface ISavingsState {
  savingsAccounts: IProduct[];
  programmedSavings: IProduct[];
  savingsContributions: IProduct[];
  cdats: IProduct[];
}

interface ISavingsContext {
  savings: ISavingsState;
  commitments: ICommitment[];
  setCommitments: React.Dispatch<React.SetStateAction<ICommitment[]>>;
  setSavings: React.Dispatch<React.SetStateAction<ISavingsState>>;
}

export type { ISavingsContext, ISavingsState };
