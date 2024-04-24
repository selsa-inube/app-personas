import { IFeaturedFlag } from "src/model/entity/featuredFlag";

const mapFeaturedFlagApiToEntity = (
  featuredFlag: Record<string, string | number | object>,
): IFeaturedFlag => {
  const value =
    Array.isArray(featuredFlag.flags) &&
    featuredFlag.flags.length > 0 &&
    Object(featuredFlag.flags[0]).value;
    
  return {
    [String(featuredFlag.scope)]: {
      [String(featuredFlag.category)]: {
        [String(featuredFlag.product)]: {
          [String(featuredFlag.public_code)]: {
            id: String(featuredFlag.public_code),
            name: String(featuredFlag.abbreviated_name),
            description: String(featuredFlag.description_use),
            value: Boolean(value || false),
          },
        },
      },
    },
  };
};

const mapFeaturedFlagsApiToEntities = (
  featuredFlags: Record<string, string | number | object>[],
): IFeaturedFlag[] => {
  return featuredFlags.map((featuredFlag) =>
    mapFeaturedFlagApiToEntity(featuredFlag),
  );
};

export { mapFeaturedFlagsApiToEntities };
