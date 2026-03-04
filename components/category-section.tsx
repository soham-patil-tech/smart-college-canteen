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
    <section className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-4.5 w-4.5 text-primary" />
        </div>
        <h2 className="font-serif text-xl font-bold text-foreground">
          {categoryLabels[category] || category}
        </h2>
        <div className="ml-auto flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {items.length} items
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
