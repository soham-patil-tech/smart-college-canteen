"use client"

import { useState, useEffect } from "react"
import { Search, Sunrise, UtensilsCrossed, Cookie, Coffee, LayoutGrid } from "lucide-react"
import { menuItems } from "@/lib/data"
import { CategorySection } from "./category-section"
import { MenuCard } from "./menu-card"
import { SkeletonGrid } from "./loading-spinner"
import { cn } from "@/lib/utils"

const categories = [
  { key: "all", label: "All Items", icon: LayoutGrid },
  { key: "breakfast", label: "Breakfast", icon: Sunrise },
  { key: "lunch", label: "Lunch", icon: UtensilsCrossed },
  { key: "snacks", label: "Snacks", icon: Cookie },
  { key: "beverages", label: "Beverages", icon: Coffee },
] as const

export function MenuContent() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const groupedItems = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, typeof menuItems>
  )

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Full Menu
        </h1>
        <p className="text-sm text-muted-foreground">
          Browse all {menuItems.length} items across {categories.length - 1}{" "}
          categories
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-input bg-card py-3 pl-10 pr-4 text-sm text-card-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:shadow-md focus:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Menu Grid */}
      {loading ? (
        <SkeletonGrid count={8} />
      ) : filteredItems.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card py-20">
          <Search className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-lg font-semibold text-foreground">No items found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or category filter.
          </p>
        </div>
      ) : activeCategory === "all" ? (
        <div className="flex flex-col gap-10">
          {Object.entries(groupedItems).map(([category, items]) => (
            <CategorySection
              key={category}
              category={category}
              items={items}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
