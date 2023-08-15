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
  date: string;
  reference: string;
  description: string;
  capital_payment: number;
  interest: number;
  life_insurance: number;
  patrimonial_insurance: number;
  capitalization: number;
  others: number;
  commission: number;
}

interface IAmortization {
  payment_number: number;
  date: string;
  capital_payment: number;
  interest: number;
  life_insurance: number;
  patrimonial_insurance: number;
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

export type { IProduct, ITagProduct, IAttribute };
