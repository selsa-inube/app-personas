import { TagProps } from "@design/data/Tag";

interface IAttribute {
  id: string;
  label: string;
  value: number | string | string[];
}

interface IMovement {
  id: string;
  date: string;
  reference: string;
  description: string;
  capitalPayment: number;
  interest: number;
  lifeInsurance: number;
  patrimonialInsurance: number;
  capitalization: number;
  commission: number;
  totalValue: number;
}

interface IAmortization {
  id: string;
  paymentNumber: number;
  date: string;
  capitalPayment: number;
  interest: number;
  lifeInsurance: number;
  patrimonialInsurance: number;
  capitalization: number;
  others: number;
  totalMonthlyValue: number;
  projectedBalance: number;
}

interface IProduct {
  id: string;
  title: string;
  attributes: IAttribute[];
  movements?: IMovement[];
  amortization?: IAmortization[];
  tags?: TagProps[];
  userOwner?: string;
}

export type { IAmortization, IAttribute, IMovement, IProduct };
