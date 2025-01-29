import { IFeatureFlag } from "src/model/entity/featureFlag";
import { getFeatureFlagsByBunit } from "src/services/featureFlags/getFeatureFlags";
import { IServiceDomains } from "./types";
import { enviroment } from "@config/enviroment";

const initialServiceDomains: IServiceDomains = {
  integratedbanks: [],
  identificationtype: [],
  actionafterexpiration: [],
};

const getAppFeatureFlags = async (): Promise<IFeatureFlag[]> => {
  const foundFlags = await getFeatureFlagsByBunit(enviroment.BUSINESS_UNIT);

  return foundFlags;
};

export { getAppFeatureFlags, initialServiceDomains };
