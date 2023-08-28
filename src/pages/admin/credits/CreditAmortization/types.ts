import { IAmortization, IAttribute } from "@ptypes/pages/product.types";

interface IOption {
  id: string;
  isDisabled?: boolean;
  value: string;
  title: string;
}

interface ISelectedProductState {
  amortization: IAmortization[];
  option: IOption;
  totalAmortization: number;
  interestRateAttr: IAttribute;
  termsAttr: IAttribute;
}

export type { ISelectedProductState };
