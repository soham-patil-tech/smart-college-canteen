import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://zcntyyacwmmkbwoelfwv.supabase.co"
const supabaseAnonKey = "sb_publishable_zYiRnGu-jNIimGyTrp0YYQ_bUSIGyVr"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)