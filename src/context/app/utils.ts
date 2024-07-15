import { IFeatureFlag } from "src/model/entity/featureFlag";
import { getFeatureFlagsByBunit } from "src/services/featureFlags/getFeatureFlags";

const getAppFeatureFlags = async (): Promise<IFeatureFlag[]> => {
  const foundFlags = await getFeatureFlagsByBunit("fondecom");

  return foundFlags;
};

export { getAppFeatureFlags };
