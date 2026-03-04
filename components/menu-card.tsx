import { Sunrise, UtensilsCrossed, Cookie, Coffee } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MenuItem } from "@/lib/data"
import { categoryLabels } from "@/lib/data"

const categoryIconMap: Record<string, React.ElementType> = {
  breakfast: Sunrise,
  lunch: UtensilsCrossed,
  snacks: Cookie,
  beverages: Coffee,
}

export function MenuCard({ item }: { item: MenuItem }) {
  const Icon = categoryIconMap[item.category] || UtensilsCrossed

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        !item.available && "opacity-60"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            item.available
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
          )}
        >
          {item.available ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-serif text-base font-bold text-card-foreground">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-lg font-bold text-primary">
          {"₹"}{item.price}
        </span>
        <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
          {categoryLabels[item.category]}
        </span>
      </div>
    </div>
  )
}
