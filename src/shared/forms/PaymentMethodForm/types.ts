import { IOption } from "@inubekit/inubekit";

interface IPaymentMethodEntry {
  paymentMethodType: string;
  paymentMethods: IOption[];
  accountToDebit?: string;
  accountSelection?: string;
  accountNumberSelect?: string;
  accountType?: string;
  bankEntity?: string;
  accountNumberTextField?: string;
}

export type { IPaymentMethodEntry };
