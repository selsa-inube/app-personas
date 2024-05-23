import { IApplyPayOption } from "@components/modals/payments/CustomValueModal/utils";
import { TagProps } from "@design/data/Tag";
import { EMoneySourceType } from "@pages/admin/payments/Pay/forms/PaymentMethodForm/types";
import {
  EPaymentGroupType,
  EPaymentOptionType,
  EPaymentStatusType,
  ESupportDocumentType,
} from "@pages/admin/payments/Pay/types";

interface IPaymentOption {
  id: EPaymentOptionType;
  label: string;
  description?: string;
  date?: Date;
  value: number;
  selected?: boolean;
  hidden?: boolean;
}

interface IPayment {
  id: string;
  title: string;
  group: EPaymentGroupType;
  paymentMethod: string;
  status: EPaymentStatusType;
  options: IPaymentOption[];
  tags: TagProps[];
  supportDocumentType: ESupportDocumentType;
  valueToPay?: number;
  applyPayOption?: IApplyPayOption;
  lineCode?: string;
  halfPayment?: string;
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

interface IProductPayment {
  productName: string;
  productNumber: string;
  valueToPay: number;
  applyPayment?: string;
}

interface IPaymentHistory {
  id: string;
  title: string;
  tag: TagProps;
  value: number;
  paymentDate: Date;
  paymentMethod: string;
  cus: string;
  products?: IProductPayment[];
}

interface IPaymentOptionRequest {
  payValue: number;
  totalExpiredValue: number;
  creditLine: string;
  halfPayment: string;
  nextExpirationDate: string;
  nextValueExpiration: number;
  obligationNumber: string;
  paymentDate: string;
}

interface IPaymentOptionRequestResponse {
  isValid: string;
  optionList: { code: string; description: string }[];
}

export type {
  IPayment,
  IPaymentHistory,
  IPaymentOption,
  IPaymentRequest,
  IPaymentRequestResponse,
  IProductPayment,
  IPaymentOptionRequest,
  IPaymentOptionRequestResponse,
};
