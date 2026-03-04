"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { menuItems } from "@/lib/data"
import { CategorySection } from "./category-section"
import { cn } from "@/lib/utils"

const categories = ["all", "breakfast", "lunch", "snacks", "beverages"] as const

const categoryFilterLabels: Record<string, string> = {
  all: "All Items",
  breakfast: "Breakfast",
  lunch: "Lunch",
  snacks: "Snacks",
  beverages: "Beverages",
}

export function MenuContent() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

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
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6">
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-input bg-card py-3 pl-10 pr-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            )}
          >
            {categoryFilterLabels[cat]}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16">
          <p className="text-lg font-medium text-foreground">No items found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or category filter.
          </p>
        </div>
      ) : activeCategory === "all" ? (
        <div className="flex flex-col gap-8">
          {Object.entries(groupedItems).map(([category, items]) => (
            <CategorySection
              key={category}
              category={category}
              items={items}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div key={item.id}>
              <CategorySingleCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// When viewing a single category, use MenuCard directly
import { MenuCard } from "./menu-card"
function CategorySingleCard({ item }: { item: (typeof menuItems)[number] }) {
  return <MenuCard item={item} />
}
