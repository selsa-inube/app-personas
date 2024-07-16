import { ISelectOption } from "@design/input/Select/types";
import { IDestinationEntry } from "../forms/DestinationForm/types";

const mapDestination = (destinations: ISelectOption[]): IDestinationEntry => {
  return {
    destinations,
    products: [],
  };
};

export { mapDestination };
