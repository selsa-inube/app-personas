interface IMoneySource {
  [key: string]: { label: string; value: number; maxFunds: number };
}

interface IPaymentMethodEntry {
  paymentMethod: string;
  moneySources?: IMoneySource;
  valueToPay: number;
  paidValue: number;
  pendingValue: number;
}

export type { IMoneySource, IPaymentMethodEntry };
