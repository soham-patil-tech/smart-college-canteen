"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, ArrowRight, Sparkles, Bell } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { MenuCard } from "./menu-card"
import { SkeletonGrid } from "./loading-spinner"

export function HomeContent() {

  const [loading, setLoading] = useState(true)

  const [menuItems, setMenuItems] = useState<any[]>([])
  const [timings, setTimings] = useState<any[]>([])
  const [notices, setNotices] = useState<any[]>([])

  useEffect(() => {

    fetchMenu()
    fetchTimings()
    fetchNotices()

    // realtime menu updates
    const menuChannel = supabase
      .channel("menu-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "menu" },
        () => fetchMenu()
      )
      .subscribe()

    // realtime timing updates
    const timingChannel = supabase
      .channel("timing-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "timings" },
        () => fetchTimings()
      )
      .subscribe()

    // realtime notices
    const noticeChannel = supabase
      .channel("notice-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notices" },
        () => fetchNotices()
      )
      .subscribe()

    const timer = setTimeout(() => setLoading(false), 800)

    return () => {
      clearTimeout(timer)
      supabase.removeChannel(menuChannel)
      supabase.removeChannel(timingChannel)
      supabase.removeChannel(noticeChannel)
    }

  }, [])

  async function fetchMenu() {

    const { data } = await supabase
      .from("menu")
      .select("*")

    if (data) setMenuItems(data)

  }

  async function fetchTimings() {

    const { data } = await supabase
      .from("timings")
      .select("*")

    if (data) {

      const formatted = data.map((t) => ({
        label: t.category,
        time: `${t.start_time?.replace(/-.*/, "").trim()} - ${t.end_time}`
      }))

      setTimings(formatted)

    }

  }

  async function fetchNotices() {

    const { data } = await supabase
      .from("notices")
      .select("*")

    if (data) {

      const formatted = data.map((n) => n.text)

      setNotices(formatted)

    }

  }

  const todayItems = menuItems.filter((item) => item.available)
  const availableCount = todayItems.length
  const totalCount = menuItems.length

  return (
    <div className="flex flex-col gap-8">

      {/* College Banner */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full">
          <Image
  src="/images/pccoer-banner.jpg"
  alt="PCCOER Banner"
  width={1920}
  height={600}
  className="w-full h-auto object-contain"
  priority
/>
        </div>
      </section>

      {/* Title */}
      <section className="mx-auto w-full max-w-6xl px-4">
       <div className="rounded-2xl overflow-hidden border border-border shadow-md">
 <img
  src="images/canteen-banner.jpg"
  alt="College Canteen Food"
  className="w-full h-[180px] md:h-[260px] object-cover"
/>
</div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-8">

        {/* Hero */}
        <section className="flex flex-col gap-4 rounded-2xl border border-primary/20 bg-card p-5 md:p-8 shadow-sm">

          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-wider">
              Welcome to the PCCOER Canteen!
            </span>
          </div>

          <h2 className="font-serif text-2xl font-bold leading-tight text-card-foreground md:text-3xl text-balance">
            Fresh meals, made with care for our students.
          </h2>

          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            {availableCount} of {totalCount} items available right now.
          </p>

          

        </section>

        {/* Timings */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">

          {timings.map((timing) => (

            <div
              key={timing.label}
              className="flex flex-col gap-1.5 rounded-xl border border-border bg-card p-4 hover:shadow-md"
            >

              <div className="flex items-center gap-1.5">

                <Clock className="h-3.5 w-3.5 text-primary" />

                <span className="text-xs font-bold uppercase tracking-wide text-primary">
                  {timing.label}
                </span>

              </div>

              <span className="font-serif text-sm font-bold text-card-foreground">
                {timing.time}
              </span>

            </div>

          ))}

        </section>

        {/* Today's Menu */}
        <section className="flex flex-col gap-5">

          <div className="flex items-center justify-between">

            <div className="flex flex-col gap-0.5">

              <h2 className="font-serif text-2xl font-bold text-foreground">
                Today's Menu
              </h2>

              <p className="text-sm text-muted-foreground">
                {availableCount} items available right now
              </p>

            </div>

            <Link
              href="/menu"
              className="flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary"
            >
              See all
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>

          {loading ? (
            <SkeletonGrid count={6} />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {todayItems.slice(0, 6).map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}

            </div>
          )}

        </section>

        {/* Notices */}
        {notices.length > 0 && (

          <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">

            <div className="flex items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Bell className="h-4 w-4 text-primary" />
              </div>

              <h3 className="font-serif text-lg font-bold text-card-foreground">
                Notices
              </h3>

            </div>

            <ul className="flex flex-col gap-2.5">

              {notices.map((notice, i) => (

                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3 text-sm"
                >

                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {i + 1}
                  </span>

                  {notice}

                </li>

              ))}

            </ul>

          </section>

        )}

      </div>

    </div>
  )
}