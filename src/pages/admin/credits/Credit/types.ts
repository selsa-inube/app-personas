import { ISelectOption } from "@design/input/Select/types";
import { IProduct } from "src/model/entity/product";

interface ISelectedProductState {
  credit: IProduct;
  option: ISelectOption;
}

export type { ISelectedProductState };
