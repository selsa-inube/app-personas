import { IAid } from "src/model/entity/service";
import { capitalizeText } from "src/utils/texts";

const mapAidApiToEntity = (
  aid: Record<string, string | number | object>,
): IAid => {
  return {
    id: String(aid.id),
    title: capitalizeText(String(aid.alias || aid.name)),
    type: {
      id: Object(aid.aidType).code,
      value: Object(aid.aidType).description,
    },
  };
};

const mapAidsApiToEntities = (
  aids: Record<string, string | number | object>[],
): IAid[] => {
  return aids
    .filter((aid) => Boolean(aid.publish) === true)
    .map((aid) => mapAidApiToEntity(aid));
};

export { mapAidApiToEntity, mapAidsApiToEntities };
