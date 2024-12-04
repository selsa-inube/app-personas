import { ISelectOption } from "@design/input/Select/types";

const mapAttentionPointApiToEntity = (
  point: Record<string, string | number | object>,
): ISelectOption => {
  return {
    id: String(point.placeName),
    value: String(point.alias),
  };
};

const mapAttentionPointsApiToEntities = (
  points: Record<string, string | number | object>[],
): ISelectOption[] => {
  return points
    .filter((point) => Boolean(point.publish) === true)
    .map((point) => mapAttentionPointApiToEntity(point));
};

export { mapAttentionPointApiToEntity, mapAttentionPointsApiToEntities };
