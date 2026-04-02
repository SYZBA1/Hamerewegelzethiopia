"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/lms/Sidebar";
import TopNavbar from "@/components/lms/TopNavbar";

const routeTitles: Record<string, string> = {
  "/lms": "LMS Home",
  "/lms/login": "Sign In",
  "/lms/register": "Register",
  "/lms/dashboard": "Dashboard",
  "/lms/courses": "Courses",
};

export default function LMSLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const title = useMemo(() => routeTitles[pathname || "/lms"] || "LMS", [pathname]);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#051f20] via-[#0b2b26] to-[#163832] text-white">
      <Sidebar isCollapsed={collapsed} onToggle={() => setCollapsed((x) => !x)} />
      <div className="flex flex-1 flex-col">
        <TopNavbar title={title} />
        <main className="min-h-[calc(100vh-64px)] overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}

