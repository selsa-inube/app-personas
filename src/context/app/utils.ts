import { IFeaturedFlag } from "src/model/entity/featuredFlag";
import { getFeaturedFlagsByCodes } from "src/services/featuredFlags/getFeaturedFlags";

const getAppFeaturedFlags = async (): Promise<{
  [key: string]: IFeaturedFlag;
}> => {
  const foundFlags = await getFeaturedFlagsByCodes([
    "update-data-with-assisted",
    "update-data-without-assisted",
  ]);

  return foundFlags
    .map((flag) => ({
      [flag.id]: flag,
    }))
    .reduce((acc, flag) => ({ ...acc, ...flag }), {});
};

export { getAppFeaturedFlags };
