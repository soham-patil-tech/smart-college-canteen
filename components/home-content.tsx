"use client"

import Link from "next/link"
import { Clock, ArrowRight, Sparkles } from "lucide-react"
import { menuItems, canteenInfo } from "@/lib/data"
import { MenuCard } from "./menu-card"

export function HomeContent() {
  const todayItems = menuItems.filter((item) => item.available)
  const availableCount = todayItems.length
  const totalCount = menuItems.length

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-6">
      {/* Hero Section */}
      <section className="flex flex-col gap-4 rounded-2xl bg-primary p-6 text-primary-foreground md:p-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wide opacity-90">
            {"Today's Special"}
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold leading-tight text-balance md:text-4xl">
          Fresh meals, made with care for our students.
        </h1>
        <p className="max-w-lg text-sm leading-relaxed opacity-90">
          {availableCount} of {totalCount} items available right now. Check out
          {"what's"} cooking today!
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-4 py-2.5 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
          >
            View Full Menu
            <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-1.5 rounded-lg bg-primary-foreground/15 px-3 py-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>{canteenInfo.timings[0].time}</span>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {canteenInfo.timings.map((timing) => (
          <div
            key={timing.label}
            className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4"
          >
            <span className="text-xs font-medium text-muted-foreground">
              {timing.label}
            </span>
            <span className="font-serif text-sm font-bold text-card-foreground">
              {timing.time}
            </span>
          </div>
        ))}
      </section>

      {/* Today's Menu */}
      <section className="flex flex-col gap-4">
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
            className="flex items-center gap-1 text-sm font-medium text-primary transition-opacity hover:opacity-80"
          >
            See all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {todayItems.slice(0, 6).map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Notices */}
      {canteenInfo.notices.length > 0 && (
        <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
          <h3 className="font-serif text-lg font-bold text-card-foreground">
            Notices
          </h3>
          <ul className="flex flex-col gap-2">
            {canteenInfo.notices.map((notice, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {notice}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
