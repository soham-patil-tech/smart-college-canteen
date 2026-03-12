import { Navbar } from "@/components/navbar"
import { BottomNav } from "@/components/bottom-nav"
import { Footer } from "@/components/footer"
import { AdminContent } from "@/components/admin-content"
import { supabase } from "@/lib/supabase"

export default async function AdminPage() {

  // Fetch menu
  const { data: menu } = await supabase
    .from("menu")
    .select("*")

  // Fetch notices
  const { data: notices } = await supabase
    .from("notices")
    .select("*")

  // Fetch timings
  const { data: timings } = await supabase
    .from("timings")
    .select("*")

  return (
    <div className="flex min-h-dvh flex-col bg-background">

      <Navbar />

      <main className="flex-1 pb-20 md:pb-0">

        <AdminContent
          menu={menu || []}
          notices={notices || []}
          timings={timings || []}
        />

      </main>

      <Footer />

      <BottomNav />

    </div>
  )
}
