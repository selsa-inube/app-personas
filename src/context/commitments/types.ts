import { ICommitment } from "src/model/entity/product";

interface ICommitmentsContext {
  commitments: ICommitment[];
  setCommitments: React.Dispatch<React.SetStateAction<ICommitment[]>>;
}

export type { ICommitmentsContext };
