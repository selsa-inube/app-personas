import { IFeaturedFlag } from "src/model/entity/featuredFlag";
import { mapFeaturedFlagApiToEntity } from "../getFeaturedFlag/mappers";

const mapFeaturedFlagsApiToEntities = (
  featuredFlags: Record<string, string | number>[],
): IFeaturedFlag[] => {
  return featuredFlags.map((featuredFlag) =>
    mapFeaturedFlagApiToEntity(featuredFlag),
  );
};

export { mapFeaturedFlagsApiToEntities };
