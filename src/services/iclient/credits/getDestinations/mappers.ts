import { ISelectOption } from "@design/input/Select/types";
import { capitalizeText } from "src/utils/texts";

const mapDestinationApiToEntity = (
  destination: Record<string, string | number | object>,
): ISelectOption => {
  return {
    id: String(destination.destinationId),
    value: capitalizeText(String(destination.name).toLowerCase()),
  };
};

const mapDestinationsApiToEntities = (
  destinations: Record<string, string | number | object>[],
): ISelectOption[] => {
  return destinations
    .filter((destination) => Boolean(destination.publishStatus) === true)
    .map((destination) => mapDestinationApiToEntity(destination));
};

export { mapDestinationApiToEntity, mapDestinationsApiToEntities };
