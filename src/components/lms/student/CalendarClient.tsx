"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const upcomingEvents = [
  { id: 1, title: "Theology Lecture", time: "Mon, 9:00 AM", location: "Main Hall" },
  { id: 2, title: "Prayer Meeting", time: "Tue, 6:30 PM", location: "Chapel" },
  { id: 3, title: "Assignment Deadline", time: "Thu, 11:59 PM", location: "Online" },
  { id: 4, title: "Faculty Advisory", time: "Fri, 2:00 PM", location: "Student Center" },
];

const weekSchedule = [
  { day: "Mon", items: ["Biblical Studies", "Church History"] },
  { day: "Tue", items: ["Homiletics", "Prayer Meeting"] },
  { day: "Wed", items: ["Mission & Outreach", "Study Block"] },
  { day: "Thu", items: ["Systematic Theology", "Assignment Work"] },
  { day: "Fri", items: ["Mentorship", "Faculty Advisory"] },
];

export default function CalendarClient() {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("lmsAuth");
    if (!auth) router.replace("/lms/login");
  }, [router]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-[#d6ff00]/80">Student Schedule</p>
        <h2 className="mt-2 text-3xl font-bold text-white">Calendar</h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-300">
          Track classes, meetings, deadlines, and ministry activities in one place.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl lg:col-span-2">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Weekly Overview</h3>
              <p className="text-sm text-slate-400">Your classes and commitments for this week</p>
            </div>
            <div className="rounded-full border border-[#d6ff00]/20 bg-[#d6ff00]/10 px-3 py-1 text-xs font-semibold text-[#d6ff00]">
              This Week
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {weekSchedule.map((day) => (
              <div key={day.day} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white">{day.day}</h4>
                  <span className="text-xs text-slate-500">2 items</span>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {day.items.map((item) => (
                    <li key={item} className="rounded-xl bg-black/10 px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
          <p className="text-sm text-slate-400">Deadlines and meetings to keep in view</p>

          <div className="mt-4 space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">{event.title}</p>
                <p className="mt-1 text-sm text-[#d6ff00]">{event.time}</p>
                <p className="mt-1 text-xs text-slate-400">{event.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
