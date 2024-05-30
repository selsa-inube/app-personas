import { IProduct } from "src/model/entity/product";

interface ISelectedProductState {
  credit: IProduct;
  option: string;
}

interface INextPaymentModalState {
  show: boolean;
  data?: {
    nextCapital?: number;
    nextInterest?: number;
    nextPastDueInterest?: number;
    nextPenaltyInterest?: number;
    nextLifeInsurance?: number;
    nextOtherConcepts?: number;
    nextCapitalization?: number;
    nextPaymentValue: number;
  };
}

export type { INextPaymentModalState, ISelectedProductState };
