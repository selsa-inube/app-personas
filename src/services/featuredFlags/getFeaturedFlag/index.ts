import { enviroment } from "@config/enviroment";
import { IFeaturedFlag } from "src/model/entity/featuredFlag";
import { supabasedb } from "src/services/database/supabase/config";
import { mapFeaturedFlagApiToEntity } from "./mappers";

const getFeaturedFlagByCode = async (
  flagCode: string,
): Promise<IFeaturedFlag | undefined> => {
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

    const { data: flagData } = await supabasedb
      .from("featured_flag_personas")
      .select("public_code, abbreviated_name, description_use, value")
      .eq("instance_id", flagInstanceData.instance_id)
      .eq("public_code", flagCode)
      .eq("is_production", enviroment.IS_PRODUCTION)
      .single();

    if (!flagData) {
      throw new Error("No se encontró la featured flag.");
    }

    return mapFeaturedFlagApiToEntity(flagData);
  } catch (error) {
    console.info(error);

    return;
  }
};

export { getFeaturedFlagByCode };
