import { IOption } from "@inubekit/inubekit";
import { IDestinationEntry } from "../forms/DestinationForm/types";

const mapDestination = (destinations: IOption[]): IDestinationEntry => {
  return {
    destinations,
    products: [],
  };
};

export { mapDestination };
