"use client";

import { useState } from "react";
import { Clock, User, Video, Download, Plus } from "lucide-react";

const todaysClasses = [
  { id: 1, name: "Biblical Foundations Live", instructor: "Dr. Abebe", time: "09:00 AM", status: "Live Now", platform: "Zoom" },
  { id: 2, name: "Pastoral Care Discussion", instructor: "Dr. Miriam", time: "02:00 PM", status: "In 2 hours", platform: "Teams" },
];

const upcomingClasses = [
  { id: 3, date: "May 15, 2026", time: "10:00 AM", subject: "Church History", meetingLink: "zoom.us/j/123456", instructor: "Pastor Alemayehu" },
  { id: 4, date: "May 16, 2026", time: "03:00 PM", subject: "Ministry Leadership", meetingLink: "teams.microsoft.com/xxx", instructor: "Bishop Samuel" },
  { id: 5, date: "May 17, 2026", time: "11:00 AM", subject: "Theology Practicum", meetingLink: "zoom.us/j/789012", instructor: "Dr. Yeshitla" },
];

const recordedSessions = [
  { id: 101, title: "Biblical Foundations - Week 1", date: "May 8, 2026", duration: "1h 20m", views: 342 },
  { id: 102, title: "Church History - Week 2", date: "May 10, 2026", duration: "1h 45m", views: 267 },
  { id: 103, title: "Pastoral Care - Introduction", date: "May 9, 2026", duration: "2h 15m", views: 489 },
];

const attendanceSummary = {
  totalClasses: 24,
  attended: 23,
  missed: 1,
  percentage: 96,
};

export default function ClassesClient() {
  const [showReminder, setShowReminder] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Today's Classes */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">Today's Classes</h2>
        {todaysClasses.length > 0 ? (
          <div className="space-y-3">
            {todaysClasses.map((cls) => (
              <div
                key={cls.id}
                className="flex items-center justify-between rounded-2xl border border-[#d6ff00]/30 bg-[#d6ff00]/10 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-[#d6ff00]/20 p-2">
                    <Video size={20} className="text-[#d6ff00]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{cls.name}</h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <User size={12} /> {cls.instructor}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {cls.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-300">
                    {cls.status}
                  </span>
                  <button className="rounded-2xl bg-[#d6ff00] px-4 py-2 text-sm font-semibold text-[#08120f] hover:bg-[#a6ff4d] transition-colors">
                    Join Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No classes scheduled for today.</p>
        )}
      </div>

      {/* Upcoming Classes */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">Upcoming Classes</h2>
        <div className="space-y-3">
          {upcomingClasses.map((cls) => (
            <div key={cls.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[#d6ff00]" />
                    <span className="text-xs text-slate-400">{cls.date} at {cls.time}</span>
                  </div>
                  <h3 className="mt-2 font-semibold text-white">{cls.subject}</h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                    <User size={12} /> {cls.instructor}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowReminder(showReminder === cls.id ? null : cls.id)}
                    className="rounded-lg bg-white/10 p-2 hover:bg-white/20 transition-colors text-slate-300"
                  >
                    🔔
                  </button>
                  <button className="rounded-2xl bg-[#2e7d52]/30 px-3 py-2 text-xs font-semibold text-[#a5ff63] hover:bg-[#2e7d52]/50 transition-colors">
                    Open Link
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recorded Sessions */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">Recorded Sessions</h2>
        <div className="space-y-3">
          {recordedSessions.map((session) => (
            <div key={session.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{session.title}</h3>
                  <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
                    <span>{session.date}</span>
                    <span>{session.duration}</span>
                    <span>{session.views} views</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-white/10 p-2 hover:bg-white/20 transition-colors text-slate-300">
                    ▶️
                  </button>
                  <button className="rounded-lg bg-white/10 p-2 hover:bg-white/20 transition-colors text-slate-300">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">Attendance Overview</h2>
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Total Classes</p>
            <p className="mt-2 text-3xl font-bold text-[#d6ff00]">{attendanceSummary.totalClasses}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Attended</p>
            <p className="mt-2 text-3xl font-bold text-[#a5ff63]">{attendanceSummary.attended}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Missed</p>
            <p className="mt-2 text-3xl font-bold text-red-400">{attendanceSummary.missed}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Percentage</p>
            <p className="mt-2 text-3xl font-bold text-[#d6ff00]">{attendanceSummary.percentage}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
