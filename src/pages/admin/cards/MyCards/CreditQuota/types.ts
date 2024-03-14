import { ICreditQuotaDetails } from "src/model/entity/product";

interface ISelectedProductState {
  creditQuota: ICreditQuotaDetails;
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
