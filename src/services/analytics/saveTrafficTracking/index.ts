import { enviroment } from "@config/enviroment";
import { analyticsDB } from "src/services/config/supabase/config";

const saveTrafficTracking = async (uid: string) => {
  if (!enviroment.IS_PRODUCTION) return;

  const userAgent = navigator.userAgent;

  try {
    const { error } = await analyticsDB.from("traffic_tracking").insert({
      uid,
      user_agent: userAgent,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error(error);
  }
};

export { saveTrafficTracking };
