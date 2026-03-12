"use client"

import { useState, useEffect } from "react"
<<<<<<< HEAD
import React from "react"
import { supabase } from "@/lib/supabase"
=======
>>>>>>> da525b450970cb166f2e22051d48274657cefd80
import {
  Lock,
  LogIn,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  LogOut
} from "lucide-react"
<<<<<<< HEAD
import { categoryLabels } from "@/lib/data"
import type { MenuItem } from "@/lib/data"
import { cn } from "@/lib/utils"
=======
>>>>>>> da525b450970cb166f2e22051d48274657cefd80

import { supabase } from "@/lib/supabase"
import type { MenuItem } from "@/lib/data"

export function AdminContent() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
<<<<<<< HEAD
  const [items, setItems] = useState<MenuItem[]>([])
  
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
=======

  const [items, setItems] = useState<MenuItem[]>([])
>>>>>>> da525b450970cb166f2e22051d48274657cefd80
  const [isAdding, setIsAdding] = useState(false)

  const [newItem, setNewItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    price: 0,
    category: "breakfast",
    available: true,
    description: ""
  })
<<<<<<< HEAD
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
=======
>>>>>>> da525b450970cb166f2e22051d48274657cefd80

  // LOAD MENU FROM DATABASE
  useEffect(() => {
    fetchMenu()
  }, [])

  async function fetchMenu() {

    const { data, error } = await supabase
      .from("menu")
      .select("*")
      .order("id")

    if (error) {
      console.error("Error loading menu:", error)
      return
    }

    if (data) {
      setItems(data)
    }

  }

  // LOGIN
  const handleLogin = (e: React.FormEvent) => {

    e.preventDefault()

    if (email === "admin@canteen.edu" && password === "admin123") {

      setIsLoggedIn(true)
      setLoginError("")

    } else {

      setLoginError("Invalid credentials")

    }

  }

<<<<<<< HEAD
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
=======
  // DELETE ITEM
  const handleDelete = async (id: number) => {

    const { error } = await supabase
      .from("menu")
      .delete()
      .eq("id", id)

    if (error) {
      console.error(error)
    }

    fetchMenu()

  }

  // ADD ITEM
  const handleAddItem = async () => {

    if (!newItem.name || newItem.price <= 0) return

    const { error } = await supabase
      .from("menu")
      .insert([
        {
          name: newItem.name,
          price: newItem.price,
          category: newItem.category,
          available: newItem.available,
          description: newItem.description
        }
      ])

    if (error) {
      console.error(error)
    }

    setNewItem({
      name: "",
      price: 0,
      category: "breakfast",
      available: true,
      description: ""
    })

    setIsAdding(false)

    fetchMenu()

  }

  // LOGIN SCREEN
>>>>>>> da525b450970cb166f2e22051d48274657cefd80
  if (!isLoggedIn) {

    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 px-4 py-16">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Lock className="h-8 w-8 text-primary" />
        </div>

        <h1 className="text-2xl font-bold">
          Admin Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex w-full flex-col gap-4"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 rounded-lg w-full"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>

          </div>

          {loginError && (
            <p className="text-red-500">
              {loginError}
            </p>
          )}

          <button
            type="submit"
            className="bg-primary text-white p-3 rounded-lg flex items-center justify-center gap-2"
          >
            <LogIn className="h-4 w-4"/>
            Login
          </button>

        </form>

        <p className="text-sm text-gray-500">
          admin@canteen.edu / admin123
        </p>

      </div>
    )

  }

  // ADMIN DASHBOARD
  return (

    <div className="mx-auto max-w-6xl p-6 flex flex-col gap-6">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={() => setIsLoggedIn(false)}
          className="border px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <LogOut className="h-4 w-4"/>
          Logout
        </button>

      </div>

      <button
        onClick={() => setIsAdding(true)}
        className="bg-primary text-white px-4 py-2 rounded-lg w-fit flex items-center gap-2"
      >
        <Plus className="h-4 w-4"/>
        Add Item
      </button>

      {isAdding && (

        <div className="border p-4 rounded-lg flex flex-col gap-3">

          <input
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) =>
              setNewItem({ ...newItem, name: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                price: Number(e.target.value)
              })
            }
            className="border p-2 rounded"
          />

          <select
            value={newItem.category}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                category: e.target.value as MenuItem["category"]
              })
            }
            className="border p-2 rounded"
          >

            <option value="breakfast">
              Breakfast
            </option>

            <option value="lunch">
              Lunch
            </option>

            <option value="snacks">
              Snacks
            </option>

            <option value="beverages">
              Beverages
            </option>

          </select>

          <button
            onClick={handleAddItem}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Save Item
          </button>

        </div>

      )}

<<<<<<< HEAD
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
=======
      <div className="border rounded-lg overflow-hidden">

        {items.map((item) => (

          <div
            key={item.id}
            className="flex justify-between p-4 border-b"
          >

            <div>

              <p className="font-semibold">
                {item.name}
              </p>

              <p className="text-sm text-gray-500">
                ₹{item.price}
              </p>

>>>>>>> da525b450970cb166f2e22051d48274657cefd80
            </div>

            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-500"
            >
              <Trash2 className="h-4 w-4"/>
            </button>

          </div>

        ))}

      </div>

    </div>

  )

}
