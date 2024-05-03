import { IFeatureFlag } from "src/model/entity/featureFlag";
import { getFeatureFlagsByCodes } from "src/services/featureFlags/getFeatureFlags";

const getAppFeatureFlags = async (): Promise<IFeatureFlag[]> => {
  const foundFlags = await getFeatureFlagsByCodes([
    "update-data-with-assisted",
    "update-data-without-assisted",
    "request-saving",
    "request-credit",
    "request-card",
  ]);

  return foundFlags;
};

export { getAppFeatureFlags };
