import { ISelectOption } from "@design/input/Select/types";
import { IProduct, IAttribute, ICommitment } from "@ptypes/pages/product.types";

interface ISelectedProductState {
  saving: IProduct;
  option: ISelectOption;
}

interface ISelectedCommitmentState {
  commitment: ICommitment;
  option: ISelectOption;
}

interface IBeneficiariesModalState {
  show: boolean;
  data: IAttribute[];
}

export type { ISelectedProductState, IBeneficiariesModalState, ISelectedCommitmentState };
