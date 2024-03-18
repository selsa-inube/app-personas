import { EProductType, IAttribute, IProduct } from "src/model/entity/product";
import { InfoModalProps } from "@components/modals/InfoModal";

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

interface IMovementsInfoModal {
  show: boolean;
  data: InfoModalProps;
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
  IMovementsInfoModal,
};
