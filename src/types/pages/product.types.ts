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
interface ITagProduct {
  label: string;
  appearance: ProductAppearanceType;
}

interface IAttribute {
  id: string;
  label: string;
  value: number | string;
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
}

interface IAmortization {
  paymentNumber: number;
  date: string;
  capitalPayment: number;
  interest: number;
  lifeInsurance: number;
  patrimonialInsurance: number;
  capitalization: number;
  others: number;
}

interface IProduct {
  id: string;
  title: string;
  attributes: IAttribute[];
  movements?: IMovement[];
  amortization?: IAmortization[];
  tags?: ITagProduct[];
}

export type { IAttribute, IProduct, ITagProduct, IMovement };
