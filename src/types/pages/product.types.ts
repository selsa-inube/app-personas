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
  value: string;
}

interface IMovement {
  date: string;
  reference: string;
  description: string;
  value: string;
}

interface IAmortization {
  payment_number: number;
  date: string;
  total_payment: string;
  life_insurance: string;
  // contextualizar
}

interface IProduct {
  id: string;
  title: string;
  attributes: IAttribute[];
  movements?: IMovement[];
  amortization?: IAmortization[];
  tags?: ITagProduct[];
}

export type { IProduct, ITagProduct };
