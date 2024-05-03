import { IFeatureFlag } from "src/model/entity/featureFlag";

const mapFeatureFlagApiToEntity = (
  featureFlag: Record<string, string | number | object>,
): IFeatureFlag => {
  const value =
    Array.isArray(featureFlag.flags) &&
    featureFlag.flags.length > 0 &&
    Object(featureFlag.flags[0]).value;

  return {
    [String(featureFlag.scope)]: {
      [String(featureFlag.category)]: {
        [String(featureFlag.product)]: {
          [String(featureFlag.public_code)]: {
            id: String(featureFlag.public_code),
            name: String(featureFlag.abbreviated_name),
            description: String(featureFlag.description_use),
            value: Boolean(value || false),
          },
        },
      },
    },
  };
};

const mapFeatureFlagsApiToEntities = (
  featureFlags: Record<string, string | number | object>[],
): IFeatureFlag[] => {
  return featureFlags.map((featureFlag) =>
    mapFeatureFlagApiToEntity(featureFlag),
  );
};

export { mapFeatureFlagsApiToEntities };
