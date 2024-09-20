enum EMoneySourceType {
  SAVINGACCOUNT = "SAVINGACCOUNT",
  PSE = "PSE",
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
