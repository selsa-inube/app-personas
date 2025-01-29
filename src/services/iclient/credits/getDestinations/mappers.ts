import { IOption } from "@inubekit/inubekit";
import { capitalizeText } from "src/utils/texts";

const mapDestinationApiToEntity = (
  destination: Record<string, string | number | object>,
): IOption => {
  return {
    id: String(destination.destinationId),
    value: String(destination.destinationId),
    label: capitalizeText(String(destination.name).toLowerCase()),
  };
};

const mapDestinationsApiToEntities = (
  destinations: Record<string, string | number | object>[],
): IOption[] => {
  return destinations
    .filter((destination) => Boolean(destination.publishStatus) === true)
    .map((destination) => mapDestinationApiToEntity(destination));
};

export { mapDestinationApiToEntity, mapDestinationsApiToEntities };
