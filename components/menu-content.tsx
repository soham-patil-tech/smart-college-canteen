"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { MenuCard } from "@/components/menu-card"

export function MenuContent() {

  const [menuItems, setMenuItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = ["all", "breakfast", "lunch", "snacks", "beverages"]

  useEffect(() => {
    fetchMenu()
  }, [])

  async function fetchMenu() {

    const { data, error } = await supabase
      .from("menu")
      .select("*")

    if (error) {
      console.error("Error fetching menu:", error)
    } else {
      setMenuItems(data || [])
    }

    setLoading(false)
  }

  const filteredItems = menuItems.filter((item) => {

    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory

    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">

      <h1 className="text-3xl font-bold mb-2">Full Menu</h1>

      <p className="text-muted-foreground mb-4">
        Browse {menuItems.length} items
      </p>

      <input
        placeholder="Search menu items..."
        value={searchQuery}
        onChange={(e)=>setSearchQuery(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 mb-6"
      />

      {/* Category Buttons */}
      <div className="flex gap-3 mb-6 flex-wrap">

        {categories.map((cat)=>(

          <button
            key={cat}
            onClick={()=>setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition 
            ${activeCategory === cat
              ? "bg-primary text-white"
              : "bg-secondary text-secondary-foreground"}`}
          >
            {cat}
          </button>

        ))}

      </div>

      {/* Loading */}
      {loading && (
        <p>Loading menu...</p>
      )}

      {/* No Items */}
      {!loading && filteredItems.length === 0 && (
        <p>No items found</p>
      )}

      {/* Menu Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {filteredItems.map((item)=>(
          <MenuCard key={item.id} item={item}/>
        ))}

      </div>

    </div>
  )
}