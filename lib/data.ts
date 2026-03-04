export type MenuItem = {
  id: string
  name: string
  price: number
  category: "breakfast" | "lunch" | "snacks" | "beverages"
  available: boolean
  description?: string
}

export const menuItems: MenuItem[] = [
  // Breakfast
  {
    id: "b1",
    name: "Masala Dosa",
    price: 40,
    category: "breakfast",
    available: true,
    description: "Crispy rice crepe filled with spiced potato",
  },
  {
    id: "b2",
    name: "Idli Sambar",
    price: 30,
    category: "breakfast",
    available: true,
    description: "Steamed rice cakes served with lentil soup",
  },
  {
    id: "b3",
    name: "Poha",
    price: 25,
    category: "breakfast",
    available: true,
    description: "Flattened rice cooked with onions and spices",
  },
  {
    id: "b4",
    name: "Aloo Paratha",
    price: 35,
    category: "breakfast",
    available: false,
    description: "Stuffed potato flatbread with butter",
  },
  // Lunch
  {
    id: "l1",
    name: "Veg Thali",
    price: 70,
    category: "lunch",
    available: true,
    description: "Complete meal with dal, sabzi, roti, and rice",
  },
  {
    id: "l2",
    name: "Chicken Biryani",
    price: 90,
    category: "lunch",
    available: true,
    description: "Aromatic basmati rice with spiced chicken",
  },
  {
    id: "l3",
    name: "Paneer Butter Masala",
    price: 80,
    category: "lunch",
    available: true,
    description: "Cottage cheese in rich tomato gravy with naan",
  },
  {
    id: "l4",
    name: "Rajma Chawal",
    price: 60,
    category: "lunch",
    available: false,
    description: "Kidney bean curry served with steamed rice",
  },
  // Snacks
  {
    id: "s1",
    name: "Samosa",
    price: 15,
    category: "snacks",
    available: true,
    description: "Crispy pastry with spiced potato filling",
  },
  {
    id: "s2",
    name: "Vada Pav",
    price: 20,
    category: "snacks",
    available: true,
    description: "Spicy potato fritter in a soft bun",
  },
  {
    id: "s3",
    name: "Pav Bhaji",
    price: 45,
    category: "snacks",
    available: true,
    description: "Mashed vegetable curry with buttered bread",
  },
  {
    id: "s4",
    name: "Spring Roll",
    price: 35,
    category: "snacks",
    available: false,
    description: "Crispy rolls stuffed with mixed vegetables",
  },
  // Beverages
  {
    id: "d1",
    name: "Masala Chai",
    price: 15,
    category: "beverages",
    available: true,
    description: "Traditional spiced Indian tea",
  },
  {
    id: "d2",
    name: "Cold Coffee",
    price: 40,
    category: "beverages",
    available: true,
    description: "Chilled blended coffee with ice cream",
  },
  {
    id: "d3",
    name: "Fresh Lime Soda",
    price: 25,
    category: "beverages",
    available: true,
    description: "Refreshing lime drink with soda water",
  },
  {
    id: "d4",
    name: "Mango Lassi",
    price: 35,
    category: "beverages",
    available: false,
    description: "Thick mango yogurt smoothie",
  },
]

export const canteenInfo = {
  name: "Smart College Canteen PCCOER",
  timings: [
    { label: "Breakfast", time: "8:30 AM – 10:30 AM" },
    { label: "Lunch", time: "12:00 PM – 2:30 PM" },
    { label: "Snacks", time: "3:30 PM – 5:00 PM" },
    { label: "Beverages", time: "10:00 AM – 5:00 PM" },
  ],
  notices: [
    "Special Biryani available on Fridays!",
    "Canteen will remain closed on national holidays.",
    "New items added to the snacks menu this week.",
    "Feedback box available at the counter.",
  ],
  lastUpdated: "March 4, 2026 - 10:00 AM",
}

export const categoryLabels: Record<string, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  snacks: "Snacks",
  beverages: "Beverages",
}

export const categoryIcons: Record<string, string> = {
  breakfast: "sunrise",
  lunch: "utensils",
  snacks: "cookie",
  beverages: "coffee",
}
