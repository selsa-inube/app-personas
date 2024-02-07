import { IProduct } from "src/model/entity/product";

interface ISelectedProductState {
  credit: IProduct;
  option: string;
}

interface INextPaymentModalState {
  show: boolean;
  data?: {
    nextPaymentCapital?: number;
    nextPaymentInterest?: number;
    nextPaymentArrearsInterest?: number;
    nextPaymentValue: number;
  };
}

interface IDetailsInArrearsModalState {
  show: boolean;
  data?: {
    daysPastDue: number;
    inArrearsValue: number;
  };
}

export type {
  IDetailsInArrearsModalState,
  INextPaymentModalState,
  ISelectedProductState,
};
