"use client";

import { memo } from "react";
import { Bell, Globe2, Search, UserCircle2, Menu } from "lucide-react";

const TopNavbar = memo(function TopNavbar({ title, onMobileMenuToggle }: { title: string; onMobileMenuToggle?: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/15 bg-[#051F20]/80">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-lg p-2 text-[#d0f3d8] hover:bg-[#235347]"
            onClick={onMobileMenuToggle}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">{title}</h1>
            <p className="text-xs text-[#8EB69B]">Search for courses or lessons</p>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-3 rounded-lg border border-white/15 bg-[#163832]/70 p-2 max-w-md">
          <Search size={16} className="text-[#8EB69B]" />
          <input
            className="w-full bg-transparent text-sm text-white placeholder:text-[#aec9b6] focus:outline-none"
            placeholder="Search courses..."
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 text-[#d0f3d8] hover:bg-[#235347]" aria-label="notifications">
            <Bell size={18} />
          </button>
          <button className="rounded-lg p-2 text-[#d0f3d8] hover:bg-[#235347]" aria-label="language toggle">
            <Globe2 size={18} />
          </button>
          <button className="flex items-center gap-1 rounded-lg border border-white/15 bg-[#0B2B26]/70 px-2 py-1 text-sm text-[#d0f3d8] hover:bg-[#235347]">
            <UserCircle2 size={16} />
            <span className="hidden sm:inline">Student</span>
          </button>
        </div>
      </div>
    </header>
  );
});

export default TopNavbar;
