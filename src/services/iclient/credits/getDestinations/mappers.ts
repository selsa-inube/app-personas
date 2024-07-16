import { ISelectOption } from "@design/input/Select/types";
import { capitalizeText } from "src/utils/texts";

const mapDestinationApiToEntity = (
  destination: Record<string, string | number | object>,
): ISelectOption => {
  return {
    id: String(destination.reference),
    value: capitalizeText(String(destination.name).toLowerCase()),
  };
};

const mapDestinationsApiToEntities = (
  destinations: Record<string, string | number | object>[],
): ISelectOption[] => {
  return destinations.map((destination) =>
    mapDestinationApiToEntity(destination),
  );
};

export { mapDestinationApiToEntity, mapDestinationsApiToEntities };
