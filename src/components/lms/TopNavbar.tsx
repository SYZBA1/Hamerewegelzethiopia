"use client";

import { Bell, Globe2, Search, UserCircle2 } from "lucide-react";

export default function TopNavbar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-amber-300/15 bg-slate-900/90 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div>
          <h1 className="text-lg font-bold text-amber-200">{title}</h1>
          <p className="text-xs text-slate-300">Search for courses or lessons</p>
        </div>

        <div className="flex flex-1 items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 p-2">
          <Search size={16} className="text-slate-400" />
          <input
            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
            placeholder="Search courses..."
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-amber-200" aria-label="notifications">
            <Bell size={18} />
          </button>
          <button className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-amber-200" aria-label="language toggle">
            <Globe2 size={18} />
          </button>
          <button className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-sm text-slate-200 hover:bg-slate-700">
            <UserCircle2 size={16} />
            <span>Student</span>
          </button>
        </div>
      </div>
    </header>
  );
}
