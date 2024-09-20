import { EMoneySourceType } from "@pages/admin/payments/Pay/forms/PaymentMethodForm/types";
import { IPayment } from "src/model/entity/payment";

interface IPaymentRequest {
  customerCode: string;
  customerName: string;
  comments: string;
  payments: IPayment[];
  paymentMethod: {
    id: string;
    label: string;
    value?: number;
    balance: number;
    type: EMoneySourceType;
  }[];
  urlRedirect: string;
  source: string;
}

interface IPaymentRequestResponse {
  trackingCode: string;
  url?: string;
  state: string;
  message: string;
}

export type { IPaymentRequest, IPaymentRequestResponse };
