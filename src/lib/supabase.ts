import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-supabase-project.supabase.co"; // Deine Supabase-URL
const supabaseKey = "your-supabase-anon-key"; // Dein API-Schlüssel (NUR im Frontend: anon key)

export const supabase = createClient(supabaseUrl, supabaseKey);
