import { enviroment } from "@config/enviroment";
import { IFeatureFlag } from "src/model/entity/featureFlag";
import { featureFlagsDB } from "src/services/config/supabase/config";
import { mapFeatureFlagsApiToEntities } from "./mappers";

const getFeatureFlagsByBunit = async (
  businessUnit: string,
): Promise<IFeatureFlag[]> => {
  try {
    const { data: instanceData } = await featureFlagsDB
      .from("instances")
      .select(
        `instance_id,
        app!inner(app_id),
        business_unit!inner(bunit_id)
        `,
      )
      .eq("is_production", enviroment.IS_PRODUCTION)
      .eq("app.public_code", enviroment.APP_CODE)
      .eq("business_unit.public_code", businessUnit)
      .single();

    if (!instanceData) {
      throw new Error("No se encontró la instancia de la feature flag.");
    }

    const { data: flagsData } = await featureFlagsDB
      .from("feature_flags_personas")
      .select(
        `structure_id, scope, category, product, public_code, abbreviated_name, description_use,
        flags!inner(value)
        `,
      )
      .eq("app_id", "app_id" in instanceData.app && instanceData.app.app_id)
      .eq("flags.instance_id", instanceData.instance_id);

    if (!flagsData) {
      throw new Error("No se encontraron las feature flags.");
    }

    return Array.isArray(flagsData)
      ? mapFeatureFlagsApiToEntities(flagsData)
      : [];
  } catch (error) {
    console.info(error);
    return [];
  }
};

const getFeatureFlagsByCodes = async (
  flagCodes: string[],
): Promise<IFeatureFlag[]> => {
  try {
    const { data: instanceData } = await featureFlagsDB
      .from("instances")
      .select(
        `instance_id,
        app!inner(app_id),
        business_unit!inner(bunit_id)
        `,
      )
      .eq("is_production", enviroment.IS_PRODUCTION)
      .eq("app.public_code", enviroment.APP_CODE)
      .eq("business_unit.public_code", enviroment.BUSINESS_UNIT)
      .single();

    if (!instanceData) {
      throw new Error("No se encontró la instancia de la feature flag.");
    }

    const { data: flagsData } = await featureFlagsDB
      .from("feature_flags_personas")
      .select(
        `structure_id, scope, category, product, public_code, abbreviated_name, description_use,
        flags!inner(value)
        `,
      )
      .eq("app_id", "app_id" in instanceData.app && instanceData.app.app_id)
      .eq("flags.instance_id", instanceData.instance_id)
      .in("public_code", flagCodes);

    if (!flagsData) {
      throw new Error("No se encontraron las feature flags.");
    }

    return Array.isArray(flagsData)
      ? mapFeatureFlagsApiToEntities(flagsData)
      : [];
  } catch (error) {
    console.info(error);
    return [];
  }
};

export { getFeatureFlagsByBunit, getFeatureFlagsByCodes };
