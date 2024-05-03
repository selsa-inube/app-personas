import { enviroment } from "@config/enviroment";
import { createClient } from "@supabase/supabase-js";

const featureFlagsDB = createClient(
  enviroment.FEATURE_FLAGS_URL,
  enviroment.FEATURE_FLAGS_KEY,
);

const analyticsDB = createClient(
  enviroment.ANALYTICS_URL,
  enviroment.ANALYTICS_KEY,
);

export { analyticsDB, featureFlagsDB };
