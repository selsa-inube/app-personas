import { IMovement } from "src/model/entity/product";

interface ISelectedProductState {
  movements: IMovement[];
  option: string;
  totalMovements: number;
}

export type { ISelectedProductState };
