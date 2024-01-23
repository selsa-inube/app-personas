import { IProduct } from "src/model/entity/product";

interface ISelectedProductState {
  credit: IProduct;
  option: string;
}

interface INextPaymentModalState {
  show: boolean;
  data?: {
    nextPaymentCapital: number;
    nextPaymentInterest?: number;
    nextPaymentArrearsInterest?: number;
    nextPaymentValue: number;
  };
}

export type { INextPaymentModalState, ISelectedProductState };
