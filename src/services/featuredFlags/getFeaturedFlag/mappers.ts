import { IFeaturedFlag } from "src/model/entity/featuredFlag";

const mapFeaturedFlagApiToEntity = (
  featuredFlag: Record<string, string | number>,
): IFeaturedFlag => {
  return {
    id: String(featuredFlag.public_code),
    name: String(featuredFlag.abbreviated_name),
    description: String(featuredFlag.description_use),
    value: Boolean(featuredFlag.value || false),
  };
};

export { mapFeaturedFlagApiToEntity };
