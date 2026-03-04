import { Navbar } from "@/components/navbar"
import { BottomNav } from "@/components/bottom-nav"
import { Footer } from "@/components/footer"
import { AdminContent } from "@/components/admin-content"

export default function AdminPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">
        <AdminContent />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
