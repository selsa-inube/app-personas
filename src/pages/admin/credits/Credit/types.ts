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

interface ICurrentPaymentModalState {
  show: boolean;
  data?: {
    currentCapital?: number;
    currentInterest?: number;
    currentPastDueInterest?: number;
    currentPenaltyInterest?: number;
    currentLifeInsurance?: number;
    currentOtherConcepts?: number;
    currentCapitalization?: number;
    currentValue?: number;
  };
}

export type {
  INextPaymentModalState,
  ISelectedProductState,
  IExpiredPaymentModalState,
  ICurrentPaymentModalState,
};
