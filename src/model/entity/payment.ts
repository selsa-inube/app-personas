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

export type { IPayment, IPaymentOption };
