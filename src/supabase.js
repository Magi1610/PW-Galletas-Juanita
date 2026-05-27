import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = "TU_URL_DE_SUPABASE"
const SUPABASE_KEY = "TU_ANON_KEY"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
