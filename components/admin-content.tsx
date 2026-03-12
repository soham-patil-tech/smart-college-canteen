"use client"

import { useState, useEffect } from "react"
import React from "react"
import { supabase } from "@/lib/supabase"
import {
  Lock,
  LogIn,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Eye,
  EyeOff,
  LogOut,
  Mail,
  KeyRound,
  Clock,
  Save,
  Sunrise,
  Utensils,
  Cookie,
  Coffee,
} from "lucide-react"
import { categoryLabels } from "@/lib/data"
import type { MenuItem } from "@/lib/data"
import { cn } from "@/lib/utils"

const timingIcons: Record<string, React.ReactNode> = {
  Breakfast: <Sunrise className="h-4 w-4 text-primary" />,
  Lunch: <Utensils className="h-4 w-4 text-primary" />,
  Snacks: <Cookie className="h-4 w-4 text-primary" />,
  Beverages: <Coffee className="h-4 w-4 text-primary" />,
}

export function AdminContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [items, setItems] = useState<MenuItem[]>([])
  
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newItem, setNewItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    price: 0,
    category: "breakfast",
    available: true,
    description: "",
  })
  useEffect(() => {
  fetchMenu()
  fetchTimings()
}, [])

async function fetchMenu() {

  const { data, error } = await supabase
    .from("menu")
    .select("*")

  if (!error && data) {
    setItems(data)
  }

}
async function fetchTimings() {

  const { data, error } = await supabase
    .from("timings")
    .select("*")

  if (!error && data) {

    const formatted = data.map(t => ({
      label: t.category,
      time: `${t.start_time} - ${t.end_time}`
    }))

    setTimings(formatted)

  }

}
  const [timings, setTimings] = useState<any[]>([])
  const [timingsSaved, setTimingsSaved] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setLoginError("Please fill in all fields")
      return
    }
    if (email === "admin@canteen.edu" && password === "admin123") {
      setIsLoggedIn(true)
      setLoginError("")
    } else {
      setLoginError("Invalid credentials. Try admin@canteen.edu / admin123")
    }
  }

 const handleDelete = async (id: number) => {

  const { error } = await supabase
    .from("menu")
    .delete()
    .eq("id", id)

  if (error) {
    console.error(error)
    alert("Delete failed")
    return
  }

  fetchMenu()

}

 const handleToggleAvailability = async (id: number) => {

  const item = items.find((i) => Number(i.id) === id)
  if (!item) return

  const newStatus = !item.available

  const { error } = await supabase
    .from("menu")
    .update({ available: newStatus })
    .eq("id", String(id))   // ⭐ IMPORTANT

  if (error) {
    console.error("Toggle error:", error)
    alert("Failed to update status")
    return
  }

  fetchMenu()
}

  const handleSaveEdit = async () => {

  if (!editingItem) return

  const { error } = await supabase
    .from("menu")
    .update({
      name: editingItem.name,
      price: editingItem.price,
      description: editingItem.description,
      category: editingItem.category
    })
    .eq("id", editingItem.id)

  if (error) {
    console.error(error)
    alert("Update failed")
    return
  }

  fetchMenu()
  setEditingItem(null)
}

  const handleAddItem = async () => {
  if (!newItem.name || newItem.price <= 0) return

  const { data, error } = await supabase
    .from("menu")
    .insert([
      {
        name: newItem.name,
        price: newItem.price,
        category: newItem.category,
        available: newItem.available,
        description: newItem.description,
      },
    ])
    .select()

  if (error) {
    console.error(error)
    alert("Failed to add item")
    return
  }

  fetchMenu()

  setNewItem({
    name: "",
    price: 0,
    category: "breakfast",
    available: true,
    description: "",
  })

  setIsAdding(false)
}

  const handleUpdateTiming = (index: number, time: string) => {
    setTimings((prev) =>
      prev.map((t, i) => (i === index ? { ...t, time } : t))
    )
    setTimingsSaved(false)
  }

  const handleSaveTimings = async () => {

  try {

    for (const timing of timings) {

      const parts = timing.time.split("-")

      if (parts.length < 2) continue

      const start = parts[0].trim()
      const end = parts[1].trim()

      const { error } = await supabase
        .from("timings")
        .update({
          start_time: start,
          end_time: end
        })
        .eq("category", timing.label)

      if (error) {
        console.error(error)
      }

    }

    setTimingsSaved(true)

    setTimeout(() => setTimingsSaved(false), 3000)

  } catch (err) {
    console.error(err)
  }

}
  // ---- Login Screen ----
  if (!isLoggedIn) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 px-4 py-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-md shadow-primary/10">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Admin Login
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage the PCCOER canteen menu
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="flex w-full flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-lg shadow-primary/5"
        >
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-card-foreground"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@canteen.edu"
                className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-card-foreground"
            >
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {loginError && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
              {loginError}
            </p>
          )}

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-md shadow-primary/25 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </button>
        </form>

        <p className="text-xs text-muted-foreground">
          Demo: admin@canteen.edu / admin123
        </p>
      </div>
    )
  }

  // ---- Admin Dashboard ----
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage menu items and canteen timings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-card-foreground transition-colors hover:bg-secondary"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {/* ===== CANTEEN TIMING MANAGEMENT ===== */}
      <div className="rounded-2xl border-2 border-primary/20 bg-card p-6 shadow-md">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-serif text-lg font-bold text-card-foreground">
              Canteen Timing Management
            </h2>
            <p className="text-xs text-muted-foreground">
              Update the timings for each meal category
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {timings.map((timing, index) => (
            <div
              key={timing.label}
              className="flex flex-col gap-2 rounded-xl border border-border bg-background p-4 transition-all duration-200 hover:border-primary/30"
            >
              <div className="flex items-center gap-2">
                {timingIcons[timing.label]}
                <label className="text-sm font-bold text-card-foreground">
                  {timing.label} Timing
                </label>
              </div>
              <input
                type="text"
                value={timing.time}
                onChange={(e) => handleUpdateTiming(index, e.target.value)}
                placeholder="e.g. 8:30 AM - 10:30 AM"
                className="rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
              />
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={handleSaveTimings}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Save className="h-4 w-4" />
            Save Timings
          </button>
          {timingsSaved && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-success">
              <Check className="h-4 w-4" />
              Timings saved successfully
            </span>
          )}
        </div>
      </div>

      {/* ===== MENU MANAGEMENT ===== */}
      <div className="flex items-center gap-3">
        <h2 className="font-serif text-xl font-bold text-foreground">
          Menu Items
        </h2>
        <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
          {items.length} items
        </span>
      </div>

      {/* Add Item Form */}
      {isAdding && (
        <div className="rounded-2xl border-2 border-primary/20 bg-card p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-card-foreground">
              Add New Item
            </h3>
            <button
              onClick={() => setIsAdding(false)}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Close add form"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Name
              </label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                placeholder="Item name"
                className="rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Price (INR)
              </label>
              <input
                type="number"
                value={newItem.price || ""}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: Number(e.target.value) })
                }
                placeholder="0"
                className="rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Category
              </label>
              <select
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    category: e.target.value as MenuItem["category"],
                  })
                }
                className="rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="snacks">Snacks</option>
                <option value="beverages">Beverages</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Description
              </label>
              <input
                type="text"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                placeholder="Short description"
                className="rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-card-foreground">
              <input
                type="checkbox"
                checked={newItem.available}
                onChange={(e) =>
                  setNewItem({ ...newItem, available: e.target.checked })
                }
                className="h-4 w-4 rounded border-input accent-primary"
              />
              Available
            </label>
          </div>
          <div className="mt-5 flex gap-2">
            <button
              onClick={handleAddItem}
              disabled={!newItem.name || newItem.price <= 0}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              <Check className="h-4 w-4" />
              Add Item
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-card-foreground transition-colors hover:bg-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Menu Items Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-primary/5">
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-primary">
                  Item
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-primary">
                  Category
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-primary">
                  Price
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-primary">
                  Status
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-primary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-secondary/30"
                >
                  <td className="px-5 py-3.5">
                    {editingItem?.id === item.id ? (
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            name: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    ) : (
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-card-foreground">
                          {item.name}
                        </span>
                        {item.description && (
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                      {categoryLabels[item.category]}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {editingItem?.id === item.id ? (
                      <input
                        type="number"
                        value={editingItem.price}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            price: Number(e.target.value),
                          })
                        }
                        className="w-20 rounded-lg border border-input bg-background px-2.5 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    ) : (
                      <span className="text-sm font-bold text-primary">
                        {"₹"}{item.price}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => handleToggleAvailability(Number(item.id))}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-colors",
                        item.available
                          ? "bg-success/12 text-success hover:bg-success/20"
                          : "bg-destructive/12 text-destructive hover:bg-destructive/20"
                      )}
                    >
                      <span className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        item.available ? "bg-success" : "bg-destructive"
                      )} />
                      {item.available ? "Available" : "Unavailable"}
                    </button>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      {editingItem?.id === item.id ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            className="rounded-lg p-2 text-success transition-colors hover:bg-success/10"
                            aria-label="Save changes"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setEditingItem(null)}
                            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary"
                            aria-label="Cancel edit"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditingItem({ ...item })}
                            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                            aria-label={`Edit ${item.name}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(Number(item.id))}
                            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            aria-label={`Delete ${item.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="flex flex-col divide-y divide-border md:hidden">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 p-4">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-card-foreground">
                    {item.name}
                  </span>
                  {item.description && (
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  )}
                </div>
                <span className="text-sm font-bold text-primary">
                  {"₹"}{item.price}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
                    {categoryLabels[item.category]}
                  </span>
                  <button
                    onClick={() => handleDelete(Number(item.id))}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold",
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
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingItem({ ...item })}
                    className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    aria-label={`Edit ${item.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleToggleAvailability(Number(item.id))}
                    className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
