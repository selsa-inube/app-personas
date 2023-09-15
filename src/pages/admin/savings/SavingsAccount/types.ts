import { ISelectOption } from "@design/input/Select/types";
import { IAttribute, IProduct } from "src/model/entity/product";

interface ISelectedProductState {
  saving: IProduct;
  option: ISelectOption;
}

interface IBeneficiariesModalState {
  show: boolean;
  data: IAttribute[];
}

export type { IBeneficiariesModalState, ISelectedProductState };
