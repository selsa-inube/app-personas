interface IMoneySource {
  [key: string]: {
    id: string;
    label: string;
    value: number;
    balance: number;
    type: "SAVINGACCOUNT" | "PSE";
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
