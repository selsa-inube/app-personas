import { IPayment } from "src/model/entity/payment";

interface IObligationsEntry {
  payments: IPayment[];
  totalPayment: number;
  paymentMethodFilters: string[];
}

export type { IObligationsEntry };
