import {
  Clock,
  Bell,
  MapPin,
  Phone,
  Mail,
  RefreshCw,
} from "lucide-react"
import { canteenInfo } from "@/lib/data"

export function InfoContent() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Canteen Information
        </h1>
        <p className="text-sm text-muted-foreground">
          Everything you need to know about the college canteen
        </p>
      </div>

      {/* Timings */}
      <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-serif text-xl font-bold text-card-foreground">
            Canteen Timings
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {canteenInfo.timings.map((timing) => (
            <div
              key={timing.label}
              className="flex items-center justify-between rounded-lg bg-secondary/50 p-4"
            >
              <span className="text-sm font-medium text-foreground">
                {timing.label}
              </span>
              <span className="rounded-md bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {timing.time}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Important Notices */}
      <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
            <Bell className="h-4 w-4 text-accent" />
          </div>
          <h2 className="font-serif text-xl font-bold text-card-foreground">
            Important Notices
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {canteenInfo.notices.map((notice, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-border p-4"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-card-foreground">
                {notice}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Location */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-bold text-card-foreground">
              Location
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Ground Floor, Main Campus Building, Near the Library Wing
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-bold text-card-foreground">
              Contact
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-3.5 w-3.5" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              <span>canteen@college.edu</span>
            </div>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <div className="flex items-center justify-center gap-2 py-2 text-xs text-muted-foreground">
        <RefreshCw className="h-3 w-3" />
        <span>Last updated: {canteenInfo.lastUpdated}</span>
      </div>
    </div>
  )
}
