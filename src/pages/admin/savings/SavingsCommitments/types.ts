import { ICommitment } from "src/model/entity/product";

interface ISelectedCommitmentState {
  commitment: ICommitment;
  option: string;
}

interface INextPaymentModalState {
  show: boolean;
  data?: {
    nextPaymentValue: number;
  };
}

export type { ISelectedCommitmentState, INextPaymentModalState };
