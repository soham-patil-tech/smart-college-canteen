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
        "group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/8",
        !item.available && "opacity-55"
      )}
    >
      {/* Icon + Badge Row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold",
            item.available
              ? "bg-success/12 text-success"
              : "bg-destructive/12 text-destructive"
          )}
        >
          <span className={cn(
            "h-1.5 w-1.5 rounded-full",
            item.available ? "bg-success" : "bg-destructive"
          )} />
          {item.available ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <h3 className="font-serif text-base font-bold text-card-foreground">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        )}
      </div>

      {/* Price + Category */}
      <div className="mt-auto flex items-center justify-between pt-1">
        <span className="text-lg font-extrabold text-primary">
          {"₹"}{item.price}
        </span>
        <span className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
          {categoryLabels[item.category]}
        </span>
      </div>
    </div>
  )
}
