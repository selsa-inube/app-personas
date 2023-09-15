import { ISelectOption } from "@design/input/Select/types";
import { IAttribute, ICommitment, IProduct } from "src/model/entity/product";

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
