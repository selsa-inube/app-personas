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

interface IAtributeProduct {
  id: string;
  label: string;
  value: string;
}

interface ITagProduct {
  label: string;
  appearance: ProductAppearanceType;
}

interface IProduct {
  id: string;
  title: string;
  attributes: IAtributeProduct[];
  tags: ITagProduct[];
}

export type { IAtributeProduct, IProduct, ITagProduct };
