interface IMoneySource {
  [key: string]: {
    id: string;
    label: string;
    value?: number;
    balance: number;
    type: string;
  };
}

interface IPaymentMethodEntry {
  paymentMethod: string;
  moneySources?: IMoneySource;
  valueToPay: number;
  pendingValue: number;
}

export type { IMoneySource, IPaymentMethodEntry };
