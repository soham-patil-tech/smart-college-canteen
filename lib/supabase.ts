import { createClient } from "@supabase/supabase-js"

<<<<<<< HEAD
const supabaseUrl = "https://zcntyyacwmmkbwoelfwv.supabase.co"
const supabaseAnonKey = "sb_publishable_zYiRnGu-jNIimGyTrp0YYQ_bUSIGyVr"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
=======
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
>>>>>>> da525b450970cb166f2e22051d48274657cefd80
