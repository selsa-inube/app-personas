import { ISelectOption } from "@design/input/Select/types";
import { IMovement } from "@ptypes/pages/product.types";

interface ISelectedProductState {
  movements: IMovement[];
  option: ISelectOption;
  totalMovements: number;
}

export type { ISelectedProductState };
