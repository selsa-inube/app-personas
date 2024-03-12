import { EProductType, IProduct } from "src/model/entity/product";

interface ISelectedProductState {
  card: IProduct;
  option: string;
}

const initialSelectedProductState: ISelectedProductState = {
  card: {
    id: "",
    title: "",
    description: "",
    type: EProductType.CREDITCARD,
    attributes: [],
  },
  option: "",
};

export { initialSelectedProductState };
export type { ISelectedProductState };