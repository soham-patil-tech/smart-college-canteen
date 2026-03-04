import { UtensilsCrossed } from "lucide-react"

export function Footer() {
  return (
    <footer className="hidden border-t border-border bg-card pb-4 pt-8 md:block">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <UtensilsCrossed className="h-4 w-4" />
          <span className="text-sm font-medium">Smart College Canteen</span>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Daily Menu & Information System. Serving fresh meals to students every day.
        </p>
      </div>
    </footer>
  )
}
