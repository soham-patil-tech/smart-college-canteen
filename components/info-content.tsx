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
  User,
} from "lucide-react"
import { canteenInfo } from "@/lib/data"

const teamMembers = [
  {
    name: "Soham Patil",
    image: "/images/team-leader.jpg",
  },
  {
    name: "Netra Sarvankar",
    image: null,
  },
  {
    name: "Soham Shirole",
    image: null,
  },
  {
    name: "Shruti Shinde",
    image: null,
  },
]

const facultyMembers = [
  {
    name: "Mrs. Harshada Deshpande",
    designation: "Faculty Guide",
  },
  {
    name: "Dr. Smriti Pathak",
    designation: "Head of Department",
  },
]

export function InfoContent() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8">
      {/* Page Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
          Canteen Information
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Everything you need to know about the PCCOER college canteen
        </p>
      </div>

      {/* ===== CANTEEN INFORMATION SECTION ===== */}
      <section className="flex flex-col gap-6">
        {/* Canteen Timing */}
        <div className="flex flex-col gap-4 rounded-2xl border-2 border-primary/15 bg-card p-6 shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-serif text-xl font-bold text-card-foreground">
              Canteen Timing
            </h2>
          </div>
          <div className="flex items-center justify-center rounded-xl bg-primary/5 p-5">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-xl font-bold text-primary sm:text-2xl">
                10:00 AM &ndash; 5:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* Important Notices */}
        <div className="flex flex-col gap-4 rounded-2xl border-2 border-primary/15 bg-card p-6 shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15">
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
                className="flex items-start gap-3 rounded-xl border border-border p-4 transition-all duration-200 hover:bg-primary/5"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-card-foreground">
                  {notice}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Location */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-2xl border-2 border-primary/15 bg-card p-6 shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
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

          <div className="flex flex-col gap-4 rounded-2xl border-2 border-primary/15 bg-card p-6 shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
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
        </div>

        {/* Last Updated */}
        <div className="flex items-center justify-center gap-2 rounded-xl bg-primary/5 py-3 text-xs font-medium text-muted-foreground">
          <RefreshCw className="h-3.5 w-3.5 text-primary" />
          <span>Last updated: {canteenInfo.lastUpdated}</span>
        </div>
      </section>

      {/* ===== PROJECT TEAM SECTION ===== */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Project Team
          </h2>
          <p className="text-sm text-muted-foreground">
            The BCA students behind this project
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group flex flex-col items-center gap-4 rounded-2xl border-2 border-primary/15 bg-card p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              {member.image ? (
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-primary/20 transition-all duration-300 group-hover:border-primary/50 sm:h-28 sm:w-28">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary/20 bg-primary/5 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10 sm:h-28 sm:w-28">
                  <User className="h-10 w-10 text-primary/50 sm:h-12 sm:w-12" />
                </div>
              )}
              <h3 className="text-center font-serif text-sm font-bold text-card-foreground sm:text-base">
                {member.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FACULTY GUIDE & HOD SECTION ===== */}
      <section className="flex flex-col gap-6 pb-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
            <GraduationCap className="h-6 w-6 text-accent" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            {"Faculty Guide & HOD"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Our mentors and academic leadership
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {facultyMembers.map((faculty) => (
            <div
              key={faculty.name}
              className="group flex flex-col items-center gap-4 rounded-2xl border-2 border-primary/15 bg-card p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary/20 bg-primary/5 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10 sm:h-28 sm:w-28">
                <User className="h-10 w-10 text-primary/50 sm:h-12 sm:w-12" />
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <div className="flex items-center gap-1.5">
                  <Crown className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {faculty.designation}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-card-foreground sm:text-lg">
                  {faculty.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
