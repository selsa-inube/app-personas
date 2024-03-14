import { EProductType, IAttribute, IProduct } from "src/model/entity/product";

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

interface ISavingAccountsModal {
  show: boolean;
  data: IAttribute[];
}

interface IHandlingFeeModal {
  show: boolean;
  data: IAttribute[];
}

export { initialSelectedProductState };
export type {
  ISelectedProductState,
  ISavingAccountsModal,
  IHandlingFeeModal,
};
