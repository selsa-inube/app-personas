import { IFeaturedFlag } from "src/model/entity/featuredFlag";
import { getFeaturedFlagsByCodes } from "src/services/featuredFlags/getFeaturedFlags";

const getAppFeaturedFlags = async (): Promise<IFeaturedFlag[]> => {
  const foundFlags = await getFeaturedFlagsByCodes([
    "update-data-with-assisted",
    "update-data-without-assisted",
    "request-saving",
    "request-credit",
    "request-card",
  ]);

  return foundFlags;
};

export { getAppFeaturedFlags };
