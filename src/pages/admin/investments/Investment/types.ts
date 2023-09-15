import { ISelectOption } from "@design/input/Select/types";
import { IAttribute, IProduct } from "src/model/entity/product";

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
