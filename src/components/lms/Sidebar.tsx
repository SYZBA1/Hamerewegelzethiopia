"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useCallback, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Home,
  BookOpen,
  Layers,
  MessageCircle,
  Bell,
  Calendar,
  Users,
  Settings,
  User,
  LogOut,
  Menu,
} from "lucide-react";

type RoleKey = "student" | "teacher" | "administrator";

const navItemsByRole: Record<RoleKey, Array<{ href: string; label: string; icon: any }>> = {
  student: [
    { href: "/lms/dashboard", label: "Home", icon: Home },
    { href: "/lms/courses", label: "Courses", icon: BookOpen },
    { href: "/lms/classes", label: "Classes", icon: Layers },
    { href: "/lms/messages", label: "Message", icon: MessageCircle },
    { href: "/lms/notifications", label: "Notifications", icon: Bell },
    { href: "/lms/calendar", label: "Calendar", icon: Calendar },
    { href: "/lms/community", label: "Community", icon: Users },
    { href: "/lms/settings", label: "Settings", icon: Settings },
  ],
  teacher: [
    { href: "/lms/dashboard", label: "Home", icon: Home },
    { href: "/lms/courses", label: "Courses", icon: BookOpen },
    { href: "/lms/classes", label: "Classes", icon: Layers },
    { href: "/lms/messages", label: "Message", icon: MessageCircle },
    { href: "/lms/notifications", label: "Notifications", icon: Bell },
    { href: "/lms/calendar", label: "Calendar", icon: Calendar },
    { href: "/lms/community", label: "Community", icon: Users },
    { href: "/lms/settings", label: "Settings", icon: Settings },
  ],
  administrator: [
    { href: "/lms/dashboard", label: "Home", icon: Home },
    { href: "/lms/courses", label: "Courses", icon: BookOpen },
    { href: "/lms/classes", label: "Classes", icon: Layers },
    { href: "/lms/messages", label: "Message", icon: MessageCircle },
    { href: "/lms/notifications", label: "Notifications", icon: Bell },
    { href: "/lms/calendar", label: "Calendar", icon: Calendar },
    { href: "/lms/community", label: "Community", icon: Users },
    { href: "/lms/settings", label: "Settings", icon: Settings },
  ],
};

const Sidebar = memo(function Sidebar({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  const activePath = pathname || "/lms/dashboard";

  const getUserRole = useCallback(() => {
    try {
      const auth = localStorage.getItem("lmsAuth");
      if (auth) {
        const parsed = JSON.parse(auth);
        return parsed?.user?.role?.toLowerCase() || "student";
      }
    } catch {
      // fallback
    }
    return "student";
  }, []);

  const userRole = getUserRole() as RoleKey;
  const items = useMemo(() => navItemsByRole[userRole] || navItemsByRole.student, [userRole]);

  const handleLogout = useCallback(() => {
    logout();
    router.push("/lms/login");
  }, [logout, router]);

  return (
    <nav className={`flex h-full flex-col ${isCollapsed ? "w-20" : "w-64"} bg-[#08120f] border-r border-white/10 transition-all duration-300`}>
      <div className="flex items-center justify-between gap-2 px-4 py-4">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#d6ff00] text-[#0f1e13] shadow-[0_10px_30px_rgba(214,255,0,.18)]">
              E
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#a5ff63]/80">eLearner</p>
              <p className="text-sm font-semibold text-white">Student Hub</p>
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
          {items.map((item) => {
            const active = activePath.includes(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-[1.5rem] px-4 py-3 text-sm transition-all duration-200 ${
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

      <div className="mt-auto border-t border-white/10 p-4">
        <div className="rounded-[1.8rem] bg-[#112416] p-4 shadow-[0_18px_60px_rgba(0,0,0,.22)]">
          <p className="text-xs uppercase tracking-[0.24em] text-[#a9ff7b]/80">Go Premium</p>
          {!isCollapsed && (
            <p className="mt-3 text-sm leading-5 text-[#e9f8de]">
              Explore 250+ courses with lifetime membership.
            </p>
          )}
          <Link
            href="/lms/courses"
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[#d6ff00] px-3 py-3 text-sm font-semibold text-[#08120f] transition hover:bg-[#b3dd00]"
          >
            Explore Plans
          </Link>
        </div>
      </div>
    </nav>
  );
});

export default Sidebar;
