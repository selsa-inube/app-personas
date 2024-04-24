import { IApplyPayOption } from "@components/modals/payments/CustomValueModal";
import { TagProps } from "@design/data/Tag";

interface IPaymentOption {
  id: string;
  label: string;
  description?: string;
  value: number;
  selected?: boolean;
}

interface IPayment {
  id: string;
  title: string;
  group: string;
  paymentMethod: string;
  status: string;
  options: IPaymentOption[];
  tags: TagProps[];
  valueToPay?: number;
  applyPayOption?: IApplyPayOption;
}

interface IPaymentRequest {
  customerCode: string;
  customerName: string;
  comments: string;
  payments: IPayment[];
  paymentMethod: {
    id: string;
    label: string;
    value: number;
    balance: number;
    type: "savingAccount" | "pse";
  }[];
  urlRedirect: string;
}

interface IPaymentRequestResponse {
  codeTracking: string;
  url: string;
  state: string;
  message: string;
  httpStatus: number;
}

interface IProductDetailPayment {
  id: string;
  label: string;
  value: string | number;
}

interface IProductPayment {
  [index: number]: IProductDetailPayment;
}

interface IPaymentHistory {
  id: string;
  title: string;
  tag: TagProps;
  value: number;
  paymentDate: Date;
  paymentType: string;
  cus: string;
  products?: IProductPayment[];
}

export type {
  IPayment,
  IPaymentOption,
  IPaymentRequest,
  IPaymentRequestResponse,
  IPaymentHistory
};
