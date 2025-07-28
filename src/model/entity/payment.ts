import { IApplyPayOption } from "@components/modals/payments/CustomValueModal/utils";
import { ITag } from "@inubekit/inubekit";
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
  paymentMethod?: string;
  paymentMethodName: string;
  status: EPaymentStatusType;
  options: IPaymentOption[];
  tags: ITag[];
  supportDocumentType: ESupportDocumentType;
  valueToPay?: number;
  applyPayOption?: IApplyPayOption;
  lineCode?: string;
  allowCustomValue?: boolean;
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
  tag: ITag;
  value: number;
  paymentDate: Date;
  paymentMethod: string;
  cus: string;
  products?: IProductPayment[];
}

enum EPaymentMethodType {
  PSE = "PAGOPSEPSE",
  DEBIT = "DEBITSAVINGACCOUNT",
  MULTIPLE = "MULTIPLE",
}

export { EPaymentMethodType };

export type { IPayment, IPaymentHistory, IPaymentOption, IProductPayment };
