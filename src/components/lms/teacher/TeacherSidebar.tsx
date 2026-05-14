"use client";

import Link from "next/link";
import { useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  User,
  BookOpen,
  Layers,
  Users,
  FileText,
  MessageCircle,
  Calendar,
  Award,
  BarChart3,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

type LocaleKey = "en" | "am";

const teacherItems: Array<{ path: string; label: string; icon: any; exact?: boolean }> = [
  { path: "/lms/dashboard/teacher", label: "Dashboard", icon: Home, exact: true },
  { path: "/lms/dashboard/teacher/profile", label: "Profile", icon: User },
  { path: "/lms/dashboard/teacher/courses", label: "My Courses", icon: BookOpen },
  { path: "/lms/dashboard/teacher/classes", label: "Classes", icon: Layers },
  { path: "/lms/dashboard/teacher/students", label: "Students", icon: Users },
  { path: "/lms/dashboard/teacher/assignments", label: "Assignments", icon: FileText },
  { path: "/lms/dashboard/teacher/messages", label: "Messages", icon: MessageCircle },
  { path: "/lms/dashboard/teacher/calendar", label: "Calendar", icon: Calendar },
  { path: "/lms/dashboard/teacher/certificates", label: "Certificates", icon: Award },
  { path: "/lms/dashboard/teacher/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/lms/dashboard/teacher/settings", label: "Settings", icon: Settings },
];

export default function TeacherSidebar({
  isCollapsed,
  onToggle,
}: {
  isCollapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const { logout } = useAuth();

  const locale = useMemo<LocaleKey>(() => {
    const segment = pathname.split("/")[1];
    return segment === "am" ? "am" : "en";
  }, [pathname]);

  const base = `/${locale}`;

  const handleLogout = useCallback(() => {
    logout();
    router.push(`${base}/lms/login`);
  }, [base, logout, router]);

  return (
    <nav className={`flex h-full flex-col ${isCollapsed ? "w-20" : "w-72"} bg-[#0d1f14] text-white border-r border-[#1d3a26] transition-all duration-300`}>
      <div className="flex items-center justify-between gap-2 px-4 py-4 border-b border-[#1d3a26]">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#d6ff00] text-[#0f1e13] font-bold">
              SC
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#a5ff63]">Saint Cyril College</p>
              <p className="text-sm font-semibold text-white">Teacher Dashboard</p>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="rounded-2xl bg-white/5 p-2 text-[#f8fff4] hover:bg-white/10"
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-1">
          {teacherItems.map((item) => {
            const href = `${base}${item.path}`;
            const active = item.exact
              ? pathname === href
              : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <li key={item.path}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-[1.3rem] px-4 py-3 text-sm transition-all duration-200 ${
                    active
                      ? "bg-[#d6ff00] text-[#08120f] shadow-[0_20px_80px_rgba(214,255,0,.18)]"
                      : "text-[#e7f3e3] hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon size={18} />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-[#1d3a26] p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#d6ff00] px-3 py-3 text-sm font-semibold text-[#08120f] transition hover:bg-[#b3dd00]"
        >
          <LogOut size={16} />
          {!isCollapsed ? "Logout" : "Out"}
        </button>
      </div>
    </nav>
  );
}
