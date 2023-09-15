import { ISelectOption } from "@design/input/Select/types";
import { IMovement } from "src/model/entity/product";

interface ISelectedProductState {
  movements: IMovement[];
  option: ISelectOption;
  totalMovements: number;
}

export type { ISelectedProductState };
