import { enviroment } from "@config/enviroment";
import { analyticsDB } from "src/services/config/supabase/config";

const saveTrafficTracking = async (uid: string) => {
  if (!enviroment.IS_PRODUCTION) return;

  const userAgent = navigator.userAgent;

  try {
    const { error } = await analyticsDB.from("traffic_tracking").insert({
      uid,
      user_agent: userAgent,
      business_unit: enviroment.BUSINESS_UNIT,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.info(error);
  }
};

export { saveTrafficTracking };
