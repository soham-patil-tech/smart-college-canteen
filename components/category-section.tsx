import { Sunrise, UtensilsCrossed, Cookie, Coffee } from "lucide-react"
import type { MenuItem } from "@/lib/data"
import { categoryLabels } from "@/lib/data"
import { MenuCard } from "./menu-card"

const categoryIconMap: Record<string, React.ElementType> = {
  breakfast: Sunrise,
  lunch: UtensilsCrossed,
  snacks: Cookie,
  beverages: Coffee,
}

export function CategorySection({
  category,
  items,
}: {
  category: string
  items: MenuItem[]
}) {
  const Icon = categoryIconMap[category] || UtensilsCrossed

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h2 className="font-serif text-xl font-bold text-foreground">
          {categoryLabels[category] || category}
        </h2>
        <span className="ml-auto rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {items.length} items
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
