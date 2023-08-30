const productAppearance = [
  "primary",
  "success",
  "warning",
  "error",
  "help",
  "dark",
  "gray",
  "light",
] as const;

type ProductAppearanceType = (typeof productAppearance)[number];
interface ITag {
  label: string;
  appearance: ProductAppearanceType;
}

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
  others: number;
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
  tags?: ITag[];
  userOwner?: string;
}

export type { IAmortization, IAttribute, IMovement, IProduct, ITag };
