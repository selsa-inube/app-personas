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

interface IExpiredPaymentModalState {
  show: boolean;
  data?: {
    expiredCapital?: number;
    expiredInterest?: number;
    expiredPastDueInterest?: number;
    expiredPenaltyInterest?: number;
    expiredLifeInsurance?: number;
    expiredOtherConcepts?: number;
    expiredCapitalization?: number;
    expiredValue: number;
  };
}

export type {
  INextPaymentModalState,
  ISelectedProductState,
  IExpiredPaymentModalState,
};
