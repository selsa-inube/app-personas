interface IMoneySource {
  [key: string]: {
    id: string;
    label: string;
    value: number;
    balance: number;
    type: "savingAccount" | "pse";
  };
}

interface IPaymentMethodEntry {
  paymentMethod: string;
  moneySources?: IMoneySource;
  valueToPay: number;
  paidValue: number;
  pendingValue: number;
}

export type { IMoneySource, IPaymentMethodEntry };
