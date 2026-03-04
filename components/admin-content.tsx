"use client"

import { useState } from "react"
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
} from "lucide-react"
import { menuItems as initialMenuItems, categoryLabels } from "@/lib/data"
import type { MenuItem } from "@/lib/data"
import { cn } from "@/lib/utils"

export function AdminContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [items, setItems] = useState<MenuItem[]>(initialMenuItems)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newItem, setNewItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    price: 0,
    category: "breakfast",
    available: true,
    description: "",
  })

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

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleToggleAvailability = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    )
  }

  const handleSaveEdit = () => {
    if (!editingItem) return
    setItems(
      items.map((item) => (item.id === editingItem.id ? editingItem : item))
    )
    setEditingItem(null)
  }

  const handleAddItem = () => {
    if (!newItem.name || newItem.price <= 0) return
    const id = `custom-${Date.now()}`
    setItems([...items, { ...newItem, id }])
    setNewItem({
      name: "",
      price: 0,
      category: "breakfast",
      available: true,
      description: "",
    })
    setIsAdding(false)
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
            Menu Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Add, edit, or remove menu items ({items.length} total)
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
                      onClick={() => handleToggleAvailability(item.id)}
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
                            onClick={() => handleDelete(item.id)}
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
                    onClick={() => handleToggleAvailability(item.id)}
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
                    onClick={() => handleDelete(item.id)}
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
