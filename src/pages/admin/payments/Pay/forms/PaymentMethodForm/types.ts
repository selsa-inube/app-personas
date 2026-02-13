enum EMoneySourceType {
  SAVINGACCOUNT = "SAVINGACCOUNT",
  PSE = "PAGOPSE",
}

interface IMoneySource {
  [key: string]: {
    id: string;
    label: string;
    value?: number;
    balance: number;
    type: EMoneySourceType;
  };
}

interface IPaymentMethodEntry {
  paymentMethod: string;
  moneySources?: IMoneySource;
  valueToPay: number;
  pendingValue: number;
}

export { EMoneySourceType };
export type { IMoneySource, IPaymentMethodEntry };
