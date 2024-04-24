import { enviroment } from "@config/enviroment";
import { IFeaturedFlag } from "src/model/entity/featuredFlag";
import { mapFeaturedFlagsApiToEntities } from "./mappers";
import { supabasedb } from "src/services/config/supabase/config";

const getFeaturedFlagsByModule = async (
  scope: string,
  category: string,
  product: string,
): Promise<IFeaturedFlag[]> => {
  const TEMP_CLIENT = "fondecom";

  try {
    const { data: instanceData } = await supabasedb
      .from("instances")
      .select(
        `instance_id,
        app!inner(app_id),
        business_unit!inner(bunit_id)
        `,
      )
      .eq("is_production", enviroment.IS_PRODUCTION)
      .eq("app.public_code", enviroment.APP_CODE)
      .eq("business_unit.public_code", TEMP_CLIENT)
      .single();

    if (!instanceData) {
      throw new Error("No se encontró la instancia de la featured flag.");
    }

    const { data: flagsData } = await supabasedb
      .from("feature_flags_personas")
      .select(
        `structure_id, scope, category, product, public_code, abbreviated_name, description_use,
        flags!inner(value)
        `,
      )
      .eq("app_id", "app_id" in instanceData.app && instanceData.app.app_id)
      .eq("flags.instance_id", instanceData.instance_id)
      .eq("scope", scope)
      .eq("category", category)
      .eq("product", product);

    if (!flagsData) {
      throw new Error("No se encontraron las featured flags.");
    }

    return Array.isArray(flagsData)
      ? mapFeaturedFlagsApiToEntities(flagsData)
      : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getFeaturedFlagsByCodes = async (
  flagCodes: string[],
): Promise<IFeaturedFlag[]> => {
  const TEMP_CLIENT = "fondecom";

  try {
    const { data: instanceData } = await supabasedb
      .from("instances")
      .select(
        `instance_id,
        app!inner(app_id),
        business_unit!inner(bunit_id)
        `,
      )
      .eq("is_production", enviroment.IS_PRODUCTION)
      .eq("app.public_code", enviroment.APP_CODE)
      .eq("business_unit.public_code", TEMP_CLIENT)
      .single();

    if (!instanceData) {
      throw new Error("No se encontró la instancia de la featured flag.");
    }

    const { data: flagsData } = await supabasedb
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
      throw new Error("No se encontraron las featured flags.");
    }

    return Array.isArray(flagsData)
      ? mapFeaturedFlagsApiToEntities(flagsData)
      : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { getFeaturedFlagsByCodes, getFeaturedFlagsByModule };
