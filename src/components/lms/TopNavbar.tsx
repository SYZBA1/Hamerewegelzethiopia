"use client";

import { memo } from "react";
import { Bell, Globe2, Search, UserCircle2, Menu } from "lucide-react";

const TopNavbar = memo(function TopNavbar({ title, onMobileMenuToggle }: { title: string; onMobileMenuToggle?: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/15 bg-gradient-to-r from-[#0C342C]/90 to-[#076653]/90 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-lg p-2 text-[#E2FBCE] hover:bg-white/10"
            onClick={onMobileMenuToggle}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-[#FFFDEE]">{title}</h1>
            <p className="text-xs text-[#E2FBCE]">Search for courses or lessons</p>
          </div>
        </div>

        <div className="card-gradient-glass flex flex-1 items-center gap-3 p-2 max-w-md">
          <Search size={16} className="text-[#FFFDEE]" />
          <input
            className="w-full bg-transparent text-sm text-[#FFFDEE] placeholder:text-[#E2FBCE] focus:outline-none"
            placeholder="Search courses..."
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 text-[#E2FBCE] hover:bg-white/10" aria-label="notifications">
            <Bell size={18} />
          </button>
          <button className="rounded-lg p-2 text-[#E2FBCE] hover:bg-white/10" aria-label="language toggle">
            <Globe2 size={18} />
          </button>
          <button className="card-gradient-glass flex items-center gap-1 px-2 py-1 text-sm text-[#FFFDEE]">
            <UserCircle2 size={16} />
            <span className="hidden sm:inline">Student</span>
          </button>
        </div>
      </div>
    </header>
  );
});

export default TopNavbar;
