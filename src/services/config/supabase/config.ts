import { enviroment } from "@config/enviroment";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  enviroment.SUPABASE_URL,
  enviroment.SUPABASE_ANON_KEY,
);

export const supabasedb = supabase;
