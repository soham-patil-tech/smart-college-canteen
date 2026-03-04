"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, ArrowRight, Sparkles, Bell } from "lucide-react"
import { menuItems, canteenInfo } from "@/lib/data"
import { MenuCard } from "./menu-card"
import { SkeletonGrid } from "./loading-spinner"

export function HomeContent() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const todayItems = menuItems.filter((item) => item.available)
  const availableCount = todayItems.length
  const totalCount = menuItems.length

  return (
    <div className="flex flex-col gap-8">
      {/* Full-Width College Banner */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[280px] sm:h-[340px] md:h-[400px]">
          <Image
            src="/images/college-banner.jpg"
            alt="College campus building"
            fill
            className="object-cover"
            priority
          />
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
          {/* Banner content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="font-serif text-3xl font-extrabold text-primary-foreground drop-shadow-md sm:text-4xl md:text-5xl text-balance">
              ABC College of Technology
            </h1>
            <div className="mt-3 h-1 w-20 rounded-full bg-primary-foreground/50" />
            <p className="mt-4 max-w-xl text-sm font-semibold text-primary-foreground/90 drop-shadow sm:text-base md:text-lg text-balance">
              {"Smart College Canteen \u2013 Daily Menu & Information System"}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-8">
        {/* Hero Card */}
        <section className="flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-wider">
              {"Today's Special"}
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold leading-tight text-foreground md:text-3xl text-balance">
            Fresh meals, made with care for our students.
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            {availableCount} of {totalCount} items available right now. Check
            {"what's"} cooking today!
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/25 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              View Full Menu
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-1.5 rounded-lg bg-secondary px-3.5 py-2.5 text-sm font-medium text-secondary-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>{canteenInfo.timings[0].time}</span>
            </div>
          </div>
        </section>

        {/* Quick Timing Stats */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {canteenInfo.timings.map((timing) => (
            <div
              key={timing.label}
              className="flex flex-col gap-1.5 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-md"
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

        {/* Today's Menu Grid */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                {"Today's Menu"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {availableCount} items available right now
              </p>
            </div>
            <Link
              href="/menu"
              className="flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary transition-colors hover:bg-primary/15"
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
        {canteenInfo.notices.length > 0 && (
          <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-bold text-card-foreground">
                Notices
              </h3>
            </div>
            <ul className="flex flex-col gap-2.5">
              {canteenInfo.notices.map((notice, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3 text-sm text-card-foreground"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
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
