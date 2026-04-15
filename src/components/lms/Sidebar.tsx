"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useCallback, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
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
  Users,
  BarChart3,
  DollarSign,
  FileText,
  CheckSquare,
  Calendar,
  TrendingUp,
} from "lucide-react";

type RoleKey = "student" | "teacher" | "administrator";

const navItemsByRole: Record<RoleKey, Array<{ href: string; label: string; icon: any }>> = {
  student: [
    { href: "/lms/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/lms/courses", label: "My Courses", icon: BookOpen },
    { href: "/lms/assignments", label: "Assignments", icon: CircleDashed },
    { href: "/lms/certificates", label: "Certificates", icon: ShieldCheck },
    { href: "/lms/messages", label: "Messages", icon: MessageCircle },
    { href: "/lms/settings", label: "Settings", icon: Settings },
  ],
  teacher: [
    { href: "/lms/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/lms/courses", label: "My Courses", icon: BookOpen },
    { href: "/lms/assignments", label: "Assignments", icon: CircleDashed },
    { href: "/lms/students", label: "Students", icon: Users },
    { href: "/lms/attendance", label: "Attendance", icon: Calendar },
    { href: "/lms/messages", label: "Messages", icon: MessageCircle },
    { href: "/lms/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/lms/settings", label: "Settings", icon: Settings },
  ],
  administrator: [
    { href: "/lms/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/lms/users", label: "Users Management", icon: Users },
    { href: "/lms/courses", label: "Courses Management", icon: BookOpen },
    { href: "/lms/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/lms/revenue", label: "Revenue", icon: DollarSign },
    { href: "/lms/messages", label: "Messages", icon: MessageCircle },
    { href: "/lms/settings", label: "Settings", icon: Settings },
  ],
};

const Sidebar = memo(function Sidebar({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  const activePath = pathname || "/lms/dashboard";

  // Get user role from localStorage (similar to dashboard logic)
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
    <nav className={`h-full ${isCollapsed ? "w-16" : "w-56"} border-r border-white/15 bg-gradient-to-b from-[#0C342C] to-[#076653] transition-all duration-300`}>
      <div className="flex items-center justify-between gap-2 px-3 py-3">
        {!isCollapsed && <h2 className="text-sm font-semibold text-[#E2FBCE]">LMS Menu</h2>}
        <button onClick={onToggle} className="rounded-md p-1 text-[#E2FBCE] hover:bg-white/10">
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
                    ? "bg-gradient-to-r from-[#E3EF26] to-[#076653] text-white"
                    : "text-[#E2FBCE] hover:bg-white/10 hover:text-white"
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
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-[#E2FBCE] hover:bg-white/10 hover:text-white"
        >
          <User size={18} />
          {!isCollapsed && "Profile"}
        </Link>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-[#E2FBCE] hover:bg-white/10 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          {!isCollapsed && "Logout"}
        </button>
      </div>
    </nav>
  );
});

export default Sidebar;
