import { IConsultingUser } from "src/model/entity/user";
import { featureFlagsDB } from "src/services/config/supabase/config";
import { mapConsultingUsersApiToEntities } from "./mappers";
import { enviroment } from "@config/enviroment";

const getConsultingUsers = async (): Promise<IConsultingUser[]> => {
  try {
    const { data } = await featureFlagsDB
      .from("consulting_users")
      .select(`*`)
      .eq("business_unit", enviroment.BUSINESS_UNIT);

    return Array.isArray(data) ? mapConsultingUsersApiToEntities(data) : [];
  } catch (error) {
    console.info(error);
    return [];
  }
};

export { getConsultingUsers };
