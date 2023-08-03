import { AppearanceType } from "../design.types";

interface IAtributeProduct {
  id: string;
  label: string;
  value: string;
}

interface ITagProduct {
  label: string;
  appearance: AppearanceType;
}

interface IProduct {
  id: string;
  title: string;
  attributes: IAtributeProduct[];
  tags: ITagProduct[];
}

export type { IAtributeProduct, IProduct, ITagProduct };
