import { IProduct } from "src/model/entity/product";

interface ISelectedProductState {
  credit: IProduct;
  option: string;
}

export type { ISelectedProductState };
