import { IProduct } from "src/model/entity/product";

interface ISelectedProductState {
  consumption: IProduct;
  option: string;
}

export type { ISelectedProductState };
