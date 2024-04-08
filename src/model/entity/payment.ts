import { TagProps } from "@design/data/Tag";

interface IPaymentOption {
  id: string;
  label: string;
  description?: string;
  value: number;
}

interface IPayment {
  id: string;
  title: string;
  options: IPaymentOption[];
  tags: TagProps[];
  balanceValue: number;
}

export type { IPayment, IPaymentOption };
