import { enviroment } from "@config/enviroment";
import { IFeatureFlag } from "src/model/entity/featureFlag";
import { getFeatureFlagsByBunit } from "src/services/featureFlags/getFeatureFlags";
import { IServiceDomains } from "./types";

const initialServiceDomains: Omit<IServiceDomains, "valueOf"> = {
  integratedbanks: [],
  identificationtype: [],
  actionafterexpiration: [],
  countries: [],
  departments: [],
  cities: [],
  gender: [],
  civilstatus: [],
  rhfactor: [],
  relationshiptheowner: [],
};

const getAppFeatureFlags = async (): Promise<IFeatureFlag[]> => {
  const foundFlags = await getFeatureFlagsByBunit(enviroment.BUSINESS_UNIT);

  return foundFlags;
};

export { getAppFeatureFlags, initialServiceDomains };
