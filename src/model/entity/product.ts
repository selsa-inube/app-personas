import { TagProps } from "@design/data/Tag";

interface IAttribute {
  id: string;
  label: string;
  value: number | string | IAttribute[];
}

interface IMovement {
  id: string;
  date: Date;
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
  date: Date;
  type: string;
  capitalPayment?: number;
  interest: number;
  lifeInsurance?: number;
  patrimonialInsurance?: number;
  capitalization?: number;
  others: number;
  totalMonthlyValue: number;
  projectedBalance: number;
}

type CommitmentType = "PROGRAMMEDSAVINGS" | "0S" | "SC";

interface ICommitment {
  id: string;
  title: string;
  type: CommitmentType;
  description?: string;
  attributes: IAttribute[];
  products: string[];
  tag?: TagProps;
}

type ProductType =
  | "PROGRAMMEDSAVINGS"
  | "PERMANENTSAVINGS"
  | "CONTRIBUTIONS"
  // | "CL"
  //| "CE"
  | "VIEWSAVINGS"
  | "CD";
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

interface IRate {
  id: string;
  deadlineInitialDay: number;
  deadlineEndDay: number;
  investmentSquare: string;
  annualEffectiveRate: string;
}

export type {
  IAmortization,
  IAttribute,
  ICommitment,
  IMovement,
  IProduct,
  IRate,
  ProductType,
};
