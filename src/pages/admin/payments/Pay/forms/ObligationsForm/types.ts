import { IPayment } from "src/model/entity/payment";

interface IObligationsEntry {
  payments: IPayment[];
  totalPayment: number;
  allowCustomValue: boolean;
  paymentMethodFilters: string[];
}

export type { IObligationsEntry };
