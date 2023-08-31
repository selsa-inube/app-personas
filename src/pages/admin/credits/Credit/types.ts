import { ISelectOption } from "@design/input/Select/types";
import { IProduct } from "@ptypes/pages/product.types";

interface ISelectedProductState {
  credit: IProduct;
  option: ISelectOption;
}

export type { ISelectedProductState };
