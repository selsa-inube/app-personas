import { ISelectOption } from "@design/input/Select/types";
import { IAttribute, IProduct } from "@ptypes/pages/product.types";

interface ISelectedProductState {
  investment: IProduct;
  option: ISelectOption;
}

interface IModalState {
  showBeneficiaries: boolean;
  showRefund: boolean;
  dataBeneficiaries: IAttribute[];
  dataRefund: IAttribute[];
}

export type { IModalState, ISelectedProductState };
