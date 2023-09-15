import { TagProps } from "@design/data/Tag";

interface IAttribute {
  id: string;
  label: string;
  value: number | string | IAttribute[];
}

interface IMovement {
  id: string;
  date: string;
  reference: string;
  description: string;
  capitalPayment?: number;
  interest?: number;
  lifeInsurance?: number;
  patrimonialInsurance?: number;
  capitalization?: number;
  commission?: number;
  totalValue: number;
  cardNumber?: string;
  sequence?: string;
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

interface ICommitment {
  id: string;
  title: string;
  description: string;
  attributes: IAttribute[];
  products: string[];
  tag?: TagProps;
}

type ProductType = "CA" | "CD" | "AP" | "CL" | "CE";

interface IProduct {
  id: string;
  title: string;
  description: string;
  type: ProductType;
  attributes: IAttribute[];
  movements?: IMovement[];
  amortization?: IAmortization[];
  tags?: TagProps[];
  userOwner?: string;
}

export type {
  IAmortization,
  IAttribute,
  ICommitment,
  IMovement,
  IProduct,
  ProductType,
};
