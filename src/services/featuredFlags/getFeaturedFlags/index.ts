import { enviroment } from "@config/enviroment";
import { IFeaturedFlag } from "src/model/entity/featuredFlag";
import { supabasedb } from "src/services/database/supabase/config";
import { mapFeaturedFlagsApiToEntities } from "./mappers";

const getFeaturedFlagsByModule = async (
  scope: string,
  category: string,
  product: string,
): Promise<IFeaturedFlag[]> => {
  const TEMP_CLIENT = "fondecom";

  try {
    const { data: appData } = await supabasedb
      .from("app")
      .select("app_id")
      .eq("public_code", enviroment.APP_CODE)
      .single();

    const { data: bunitData } = await supabasedb
      .from("business_unit")
      .select("bunit_id")
      .eq("public_code", TEMP_CLIENT)
      .single();

    if (!appData || !bunitData) {
      throw new Error("No se encontró la aplicación o la unidad de negocio.");
    }

    const { data: flagInstanceData } = await supabasedb
      .from("flag_instance")
      .select("instance_id")
      .eq("app_id", appData.app_id)
      .eq("bunit_id", bunitData.bunit_id)
      .single();

    if (!flagInstanceData) {
      throw new Error("No se encontró la instancia de la featured flag.");
    }

    const { data: featuredFlagsData } = await supabasedb
      .from("featured_flag_personas")
      .select("public_code, abbreviated_name, description_use, value")
      .eq("instance_id", flagInstanceData.instance_id)
      .eq("scope", scope)
      .eq("category", category)
      .eq("product", product)
      .eq("is_production", enviroment.IS_PRODUCTION);

    return Array.isArray(featuredFlagsData)
      ? mapFeaturedFlagsApiToEntities(featuredFlagsData)
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
    const { data: appData } = await supabasedb
      .from("app")
      .select("app_id")
      .eq("public_code", enviroment.APP_CODE)
      .single();

    const { data: bunitData } = await supabasedb
      .from("business_unit")
      .select("bunit_id")
      .eq("public_code", TEMP_CLIENT)
      .single();

    if (!appData || !bunitData) {
      throw new Error("No se encontró la aplicación o la unidad de negocio.");
    }

    const { data: flagInstanceData } = await supabasedb
      .from("flag_instance")
      .select("instance_id")
      .eq("app_id", appData.app_id)
      .eq("bunit_id", bunitData.bunit_id)
      .single();

    if (!flagInstanceData) {
      throw new Error("No se encontró la instancia de la featured flag.");
    }

    const { data: featuredFlagsData } = await supabasedb
      .from("featured_flag_personas")
      .select("public_code, abbreviated_name, description_use, value")
      .eq("instance_id", flagInstanceData.instance_id)
      .eq("is_production", enviroment.IS_PRODUCTION)
      .in("public_code", flagCodes);

    return Array.isArray(featuredFlagsData)
      ? mapFeaturedFlagsApiToEntities(featuredFlagsData)
      : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { getFeaturedFlagsByCodes, getFeaturedFlagsByModule };
