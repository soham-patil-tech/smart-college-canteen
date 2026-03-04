import { UtensilsCrossed } from "lucide-react"

export function Footer() {
  return (
    <footer className="hidden border-t border-primary/20 bg-primary pb-6 pt-8 md:block">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4">
        <div className="flex items-center gap-2 text-primary-foreground">
          <UtensilsCrossed className="h-5 w-5" />
          <span className="font-serif text-base font-bold">
            Smart College Canteen PCCOER
          </span>
        </div>
        <p className="text-center text-sm font-medium text-primary-foreground/80">
          {"Smart College Canteen PCCOER \u2013 Daily Menu & Information System"}
        </p>
        <p className="text-center text-xs text-primary-foreground/60">
          Developed by BCA Students
        </p>
      </div>
    </footer>
  )
}
