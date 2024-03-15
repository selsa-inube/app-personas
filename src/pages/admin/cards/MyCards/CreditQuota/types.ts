import { IProduct } from "src/model/entity/product";

interface ISelectedProductState {
  creditQuota: IProduct;
  option: string;
}

interface IUsedQuotaModalState {
  show: boolean;
  data?: {
    currentConsumption?: number;
    accumulatedDebt?: number;
    transactionsProcess?: number;
    usedQuotaValue: number;
  };
}

export type { ISelectedProductState, IUsedQuotaModalState };
