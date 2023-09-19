import { IAttribute, IProduct } from "src/model/entity/product";

interface ISelectedProductState {
  saving: IProduct;
  option: string;
}

interface IBeneficiariesModalState {
  show: boolean;
  data: IAttribute[];
}

export type { IBeneficiariesModalState, ISelectedProductState };
