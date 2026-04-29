"use client";

import { memo } from "react";
import { Bell, Globe2, Search, UserCircle2, Menu } from "lucide-react";

const TopNavbar = memo(function TopNavbar({ title, onMobileMenuToggle }: { title: string; onMobileMenuToggle?: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-charcoal/10 bg-softWhite/95 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-lg p-2 text-charcoal hover:bg-primaryBg/50 hover:text-charcoal"
            onClick={onMobileMenuToggle}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-charcoal">{title}</h1>
            <p className="text-xs text-bodyText/75">Search for courses or lessons</p>
          </div>
        </div>

        <div className="card-ui flex max-w-md flex-1 items-center gap-3 p-2">
          <Search size={16} className="text-charcoal" />
          <input
            className="w-full bg-transparent text-sm text-charcoal placeholder:text-bodyText/70 focus:outline-none"
            placeholder="Search courses..."
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 text-charcoal hover:bg-primaryBg/50 hover:text-charcoal" aria-label="notifications">
            <Bell size={18} />
          </button>
          <button className="rounded-lg p-2 text-charcoal hover:bg-primaryBg/50 hover:text-charcoal" aria-label="language toggle">
            <Globe2 size={18} />
          </button>
          <button className="card-ui flex items-center gap-1 px-2 py-1 text-sm text-charcoal">
            <UserCircle2 size={16} />
            <span className="hidden sm:inline">Student</span>
          </button>
        </div>
      </div>
    </header>
  );
});

export default TopNavbar;
