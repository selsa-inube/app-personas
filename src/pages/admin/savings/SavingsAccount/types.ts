import { IAttribute, ICommitment, IProduct } from "src/model/entity/product";

interface ISelectedProductState {
  saving: IProduct;
  option: string;
}

interface IBeneficiariesModalState {
  show: boolean;
  data: IAttribute[];
}

interface IReimbursementModalState {
  show: boolean;
  data: IAttribute[];
}

interface ICommitmentsModalState {
  show: boolean;
  data: ICommitment[];
}

interface IRechargeModalState {
  show: boolean;
  savingAccount?: IProduct;
}

export type {
  IBeneficiariesModalState,
  ICommitmentsModalState,
  IRechargeModalState,
  IReimbursementModalState,
  ISelectedProductState,
};
