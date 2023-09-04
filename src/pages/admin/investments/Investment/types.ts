import { ISelectOption } from "@design/input/Select/types";
import { IProduct, IAttribute } from "@ptypes/pages/product.types";

interface ISelectedProductState {
  investment: IProduct;
  option: ISelectOption;
}

interface IBeneficiariesModalState {
  show: boolean;
  data: IAttribute[];
}

export type { ISelectedProductState, IBeneficiariesModalState };
