"use client"

import { useState, useEffect } from "react"
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

import { supabase } from "@/lib/supabase"
import type { MenuItem } from "@/lib/data"

export function AdminContent() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")

  const [items, setItems] = useState<MenuItem[]>([])
  const [isAdding, setIsAdding] = useState(false)

  const [newItem, setNewItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    price: 0,
    category: "breakfast",
    available: true,
    description: ""
  })

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
