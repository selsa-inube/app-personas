import { ISelectOption } from "@design/input/Select/types";

interface IPaymentMethodEntry {
  paymentMethodType: string;
  paymentMethods: ISelectOption[];
  accountToDebit?: string;
  accountSelection?: string;
  accountNumberSelect?: string;
  accountType?: string;
  bankEntity?: string;
  accountNumberTextField?: string;
}

export type { IPaymentMethodEntry };
