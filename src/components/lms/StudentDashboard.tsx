"use client";

import Link from "next/link";

interface StudentDashboardProps {
  userName: string;
}

const statItems = [
  { label: "Active Courses", value: "06", note: "6 this month" },
  { label: "Learning Hours", value: "18.5", note: "+3.2 this week" },
  { label: "Certificates", value: "2", note: "in progress" },
  { label: "Completion Rate", value: "06%", note: "+5% this month" },
];

const chartPoints = [
  { day: "Mon", value: 38 },
  { day: "Tue", value: 52 },
  { day: "Wed", value: 68 },
  { day: "Thu", value: 82 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 46 },
  { day: "Sun", value: 58 },
];

const scheduleItems = [
  { time: "09:00 AM", title: "UI/UX Masterclass", label: "Live" },
  { time: "02:00 PM", title: "Basic Machen learning", label: "Online" },
  { time: "04:30 PM", title: "Theory Class (Social)", label: "Class" },
];

const assignmentItems = [
  { title: "Basic Machen learning", time: "02:00 PM - 06:00 PM", status: "In Progress", color: "bg-emerald-400/15 text-emerald-200" },
  { title: "Basic Machen learning", time: "02:00 PM - 06:00 PM", status: "Completed", color: "bg-slate-700/20 text-slate-200" },
  { title: "Basic Machen learning", time: "02:00 PM - 06:00 PM", status: "Upcoming", color: "bg-amber-400/15 text-amber-200" },
];

export default function StudentDashboard({ userName }: StudentDashboardProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-[#101714]/80 p-6 shadow-2xl shadow-[#0b1c12]/60 backdrop-blur-xl">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.32em] text-[#d6ff00]">Welcome Back</p>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">{userName}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">Track your learning progress, join live classes, and complete assignments from a single dashboard built for students.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {statItems.map((stat) => (
              <div key={stat.label} className="flex min-h-[10rem] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-[#00000024]">
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-400 break-words">{stat.label}</p>
                <p className="mt-3 text-2xl font-semibold leading-none text-white sm:text-[2.1rem]">{stat.value}</p>
                <p className="mt-2 text-xs leading-tight text-slate-500 break-words">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.95fr]">
        <section className="rounded-[2rem] border border-white/10 bg-[#111f16]/95 p-6 shadow-2xl shadow-[#0b1c12]/40 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#d6ff00]">Hours Studied</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Weekly Progress</h2>
            </div>
            <div className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-100">
              Total Hours 6h
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-8">
            <div className="relative h-64 overflow-hidden rounded-[1.5rem] bg-[#0f1e17]/80 p-5">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d6ff00] via-[#7fd56f] to-[#33c36c] opacity-40" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0f1e17]/100 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,255,0,0.16),transparent_40%)]" />
              <div className="relative flex h-full items-end gap-3 px-2">
                {chartPoints.map((point) => (
                  <div key={point.day} className="flex-1">
                    <div
                      className="mx-auto h-full max-h-[80%] rounded-[1rem] bg-gradient-to-t from-[#a6ff4d] to-[#d6ff00] transition-all duration-300"
                      style={{ height: `${point.value}%` }}
                    />
                    <p className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-slate-400">{point.day}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/5 p-4 text-slate-100">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Study Focus</p>
                <p className="mt-3 text-xl font-semibold text-white">Design + Interaction</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4 text-slate-100">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Progress</p>
                <p className="mt-3 text-xl font-semibold text-white">72% Complete</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4 text-slate-100">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Upcoming</p>
                <p className="mt-3 text-xl font-semibold text-white">Live workshop</p>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-white/10 bg-[#111f16]/95 p-6 shadow-2xl shadow-[#0b1c12]/40 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#d6ff00]">Today&apos;s Schedule</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Jan 2026</h3>
              </div>
              <div className="rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">Wed 13</div>
            </div>
            <div className="mt-6 space-y-4">
              {scheduleItems.map((item) => (
                <div key={item.time} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <span className="rounded-full bg-[#d6ff00]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d6ff00]">{item.label}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{item.time}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-[#111f16]/95 p-6 shadow-2xl shadow-[#0b1c12]/40 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#d6ff00]">Assignments</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Upcoming Tasks</h3>
              </div>
              <Link href="/lms/assignments" className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-200 hover:bg-white/5">
                View All
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {assignmentItems.map((item) => (
                <div key={item.title + item.status} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.time}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${item.color}`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-[#111f16]/95 p-6 shadow-2xl shadow-[#0b1c12]/40 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.28em] text-[#d6ff00]">Education</p>
            </div>
            <p className="mt-4 text-sm text-slate-300">Keep tracking your learning goals every day and check assignments for deadlines.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
