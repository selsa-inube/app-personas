import { IPaymentFilters } from "@components/modals/payments/PaymentFilterModal";
import { IPayment } from "src/model/entity/payment";

interface IObligationsEntry {
  payments: IPayment[];
  totalPayment: number;
  allowCustomValue: boolean;
  filters: IPaymentFilters;
}

export type { IObligationsEntry };
