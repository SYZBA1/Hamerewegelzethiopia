"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Search, UserCircle2, Menu } from "lucide-react";

export default function TeacherNavbar({
  title,
  onMobileMenuToggle,
}: {
  title: string;
  onMobileMenuToggle?: () => void;
}) {
  const pathname = usePathname() || "";
  const router = useRouter();

  const locale = useMemo(() => {
    const segment = pathname.split("/")[1];
    return segment === "am" ? "am" : "en";
  }, [pathname]);

  return (
    <header className="sticky top-0 z-20 border-b border-[#d8e4da] bg-[#f3f8f3] backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden rounded-lg p-2 text-charcoal hover:bg-[#ddeadd]"
            onClick={onMobileMenuToggle}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-charcoal">{title}</h1>
            <p className="text-xs text-bodyText/75">Manage courses, students, assignments, and class activities</p>
          </div>
        </div>

        <div className="hidden lg:flex max-w-md flex-1 items-center gap-3 rounded-2xl border border-[#d8e4da] bg-white p-2">
          <Search size={16} className="text-charcoal" />
          <input
            className="w-full bg-transparent text-sm text-charcoal placeholder:text-bodyText/70 focus:outline-none"
            placeholder="Search students, classes, assignments..."
          />
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}/lms/dashboard/teacher/courses`}
            className="hidden rounded-full border border-[#d3e2d6] bg-white px-3 py-1.5 text-xs font-semibold text-[#214f35] md:inline-flex"
          >
            My Courses
          </Link>
          <Link
            href={`/${locale}/lms/dashboard/teacher/students`}
            className="hidden rounded-full border border-[#d3e2d6] bg-white px-3 py-1.5 text-xs font-semibold text-[#214f35] md:inline-flex"
          >
            Students
          </Link>
          <button
            type="button"
            onClick={() => router.push(`/${locale}/lms/dashboard/teacher/messages`)}
            className="rounded-lg p-2 text-charcoal hover:bg-[#ddeadd]"
            aria-label="notifications"
          >
            <Bell size={18} />
          </button>
          <button
            type="button"
            onClick={() => router.push(`/${locale}/lms/dashboard/teacher/profile`)}
            className="rounded-2xl border border-[#d3e2d6] bg-white px-2 py-1 text-sm text-charcoal"
            aria-label="open profile"
          >
            <span className="inline-flex items-center gap-1">
              <UserCircle2 size={16} />
              <span className="hidden sm:inline">Teacher</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
