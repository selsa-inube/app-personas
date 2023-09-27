import { ISelectOption } from "@design/input/Select/types";
import { ICommitment } from "src/model/entity/product";

interface ISelectedCommitmentState {
  commitment: ICommitment;
  option: ISelectOption;
}

export type { ISelectedCommitmentState };
