import { IOption } from "@inubekit/inubekit";

interface IPaymentMethodEntry {
  paymentMethods: IOption[];
  paymentMethod: string;
  paymentMethodName: string;
  accountToDebit?: string;
  accountNumber?: string;
  availableBalance?: string;
}

export type { IPaymentMethodEntry };
