import { Navbar } from "@/components/navbar"
import { BottomNav } from "@/components/bottom-nav"
import { Footer } from "@/components/footer"
import { HomeContent } from "@/components/home-content"

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">
        <HomeContent />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
