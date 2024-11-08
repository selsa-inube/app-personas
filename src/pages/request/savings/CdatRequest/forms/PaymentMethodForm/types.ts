import { ISelectOption } from "@design/input/Select/types";

interface IPaymentMethodEntry {
  paymentMethods: ISelectOption[];
  paymentMethod: string;
  paymentMethodName: string;
  accountToDebit?: string;
  accountNumber?: string;
  availableBalance?: string;
}

export type { IPaymentMethodEntry };
