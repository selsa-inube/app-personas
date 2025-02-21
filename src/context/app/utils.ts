import { enviroment } from "@config/enviroment";
import { IFeatureFlag } from "src/model/entity/featureFlag";
import { getFeatureFlagsByBunit } from "src/services/featureFlags/getFeatureFlags";
import { IServiceDomains } from "./types";

const initialServiceDomains: Omit<IServiceDomains, "valueOf"> = {
  integratedbanks: [],
  identificationtype: [],
  actionafterexpiration: [],
  countries: [],
  gender: [],
  civilstatus: [],
  rhfactor: [],
};

const getAppFeatureFlags = async (): Promise<IFeatureFlag[]> => {
  const foundFlags = await getFeatureFlagsByBunit(enviroment.BUSINESS_UNIT);

  return foundFlags;
};

export { getAppFeatureFlags, initialServiceDomains };
