"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import {
  BookOpen,
  CircleDashed,
  LayoutDashboard,
  MessageCircle,
  ShieldCheck,
  Settings,
  Square,
  User,
  LogOut,
  Menu,
} from "lucide-react";

const navItems = [
  { href: "/lms/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/lms/courses", label: "My Courses", icon: BookOpen },
  { href: "/lms/assignments", label: "Assignments", icon: CircleDashed },
  { href: "/lms/certificates", label: "Certificates", icon: ShieldCheck },
  { href: "/lms/messages", label: "Messages", icon: MessageCircle },
  { href: "/lms/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const activePath = pathname || "/lms/dashboard";

  const items = useMemo(() => navItems, []);

  return (
    <nav className={`h-full ${isCollapsed ? "w-16" : "w-56"} border-r border-amber-300/20 bg-slate-950/90 transition-all duration-300`}>
      <div className="flex items-center justify-between gap-2 px-3 py-3">
        {!isCollapsed && <h2 className="text-sm font-semibold text-amber-200">LMS Menu</h2>}
        <button onClick={onToggle} className="rounded-md p-1 text-slate-200 hover:bg-slate-800">
          <Menu size={16} />
        </button>
      </div>
      <ul className="space-y-1 px-1">
        {items.map((item) => {
          const active = activePath === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-2 py-2 text-sm ${
                  active
                    ? "bg-amber-500 text-[#091913]"
                    : "text-slate-300 hover:bg-slate-800 hover:text-amber-200"
                }`}
              >
                <item.icon size={18} />
                {!isCollapsed && item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto flex flex-col gap-2 p-3">
        <Link
          href="/lms/messages"
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-amber-200"
        >
          <User size={18} />
          {!isCollapsed && "Profile"}
        </Link>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-amber-200"
          onClick={() => {
            localStorage.removeItem("lmsAuth");
            window.location.href = "/lms/login";
          }}
        >
          <LogOut size={18} />
          {!isCollapsed && "Logout"}
        </button>
      </div>
    </nav>
  );
}
