import Image from "next/image"
import {
  Clock,
  Bell,
  MapPin,
  Phone,
  Mail,
  RefreshCw,
  Users,
  GraduationCap,
  Crown,
} from "lucide-react"
import { canteenInfo } from "@/lib/data"

const teamMembers = [
  {
    name: "Rahul Sharma",
    role: "Project Leader",
    image: "/images/team-leader.jpg",
  },
  {
    name: "Priya Patel",
    role: "Frontend Developer",
    image: "/images/team-frontend.jpg",
  },
  {
    name: "Amit Kumar",
    role: "Backend Developer",
    image: "/images/team-backend.jpg",
  },
  {
    name: "Sneha Gupta",
    role: "UI/UX Designer",
    image: "/images/team-designer.jpg",
  },
]

const facultyMembers = [
  {
    name: "Prof. Rajesh Verma",
    designation: "Faculty Guide",
    department: "Department of Computer Applications",
    image: "/images/faculty-guide.jpg",
  },
  {
    name: "Dr. Meera Iyer",
    designation: "Head of Department",
    department: "Department of Computer Applications",
    image: "/images/hod.jpg",
  },
]

export function InfoContent() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Canteen Information
        </h1>
        <p className="text-sm text-muted-foreground">
          Everything you need to know about the PCCOER college canteen
        </p>
      </div>

      {/* Timings Card */}
      <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-serif text-xl font-bold text-card-foreground">
            Canteen Timings
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {canteenInfo.timings.map((timing) => (
            <div
              key={timing.label}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4 transition-all duration-200 hover:bg-secondary/60"
            >
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  {timing.label}
                </span>
              </div>
              <span className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                {timing.time}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Important Notices */}
      <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
            <Bell className="h-5 w-5 text-accent" />
          </div>
          <h2 className="font-serif text-xl font-bold text-card-foreground">
            Important Notices
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {canteenInfo.notices.map((notice, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-border p-4 transition-all duration-200 hover:bg-secondary/30"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
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
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-bold text-card-foreground">
              Location
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Ground Floor, PCCOER Main Campus, Ravet, Pune - 412101
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-bold text-card-foreground">
              Contact
            </h3>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary/60" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-primary/60" />
              <span>canteen@pccoer.in</span>
            </div>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <div className="flex items-center justify-center gap-2 rounded-lg bg-secondary/50 py-3 text-xs font-medium text-muted-foreground">
        <RefreshCw className="h-3.5 w-3.5 text-primary" />
        <span>Last updated: {canteenInfo.lastUpdated}</span>
      </div>

      {/* Project Team */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Project Team
            </h2>
            <p className="text-sm text-muted-foreground">
              The BCA students behind this project
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/8"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-3 border-primary/20 transition-all duration-300 group-hover:border-primary/40 sm:h-24 sm:w-24">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center gap-0.5 text-center">
                <h3 className="font-serif text-sm font-bold text-card-foreground sm:text-base">
                  {member.name}
                </h3>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary sm:text-xs">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Faculty Guide & HOD */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
            <GraduationCap className="h-5 w-5 text-accent" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              {"Faculty Guide & HOD"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Our mentors and academic leadership
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {facultyMembers.map((faculty) => (
            <div
              key={faculty.name}
              className="group flex items-center gap-5 rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/8"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-3 border-primary/20 transition-all duration-300 group-hover:border-primary/40 sm:h-24 sm:w-24">
                <Image
                  src={faculty.image}
                  alt={faculty.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <Crown className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {faculty.designation}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-card-foreground sm:text-lg">
                  {faculty.name}
                </h3>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {faculty.department}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
