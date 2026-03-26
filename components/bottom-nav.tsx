"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, UtensilsCrossed, Info, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/info", label: "Info", icon: Info },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] backdrop-blur-lg md:hidden"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex max-w-md items-center justify-around py-1.5">
        {navLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl px-4 py-1.5 text-[11px] font-semibold transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground active:scale-95"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
                  isActive ? "bg-primary/12 scale-110" : ""
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
              </div>
              <span>{link.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
