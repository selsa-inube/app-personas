import { ISelectOption } from "@design/input/Select/types";
import { capitalizeEachWord } from "src/utils/texts";

const mapAttentionPointApiToEntity = (
  point: Record<string, string | number | object>,
): ISelectOption => {
  return {
    id: String(point.placeCode),
    value: capitalizeEachWord(String(point.placeName)),
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
