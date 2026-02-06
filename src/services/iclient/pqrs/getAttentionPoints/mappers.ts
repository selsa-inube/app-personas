import { IOption } from "@inubekit/inubekit";
import { capitalizeEachWord } from "src/utils/texts";

const mapAttentionPointApiToEntity = (
  point: Record<string, string | number | object>,
): IOption => {
  return {
    id: String(point.placeCode),
    value: String(point.placeCode),
    label: capitalizeEachWord(String(point.alias || "").trim() || String(point.placeName)),
  };
};

const mapAttentionPointsApiToEntities = (
  points: Record<string, string | number | object>[],
): IOption[] => {
  return points
    .filter((point) => Boolean(point.publish) === true)
    .map((point) => mapAttentionPointApiToEntity(point));
};

export { mapAttentionPointApiToEntity, mapAttentionPointsApiToEntities };
