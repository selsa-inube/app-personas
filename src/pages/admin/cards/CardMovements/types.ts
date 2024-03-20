import { IProduct } from "src/model/entity/product";

interface ISelectedProductState {
  movement: IProduct;
  option: string;
}

export type { ISelectedProductState };
