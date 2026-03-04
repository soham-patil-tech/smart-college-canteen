import { Navbar } from "@/components/navbar"
import { BottomNav } from "@/components/bottom-nav"
import { Footer } from "@/components/footer"
import { MenuContent } from "@/components/menu-content"

export default function MenuPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">
        <MenuContent />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
