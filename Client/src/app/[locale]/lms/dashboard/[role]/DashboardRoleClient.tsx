"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import StudentDashboard from "@/components/lms/StudentDashboard";
import TeacherDashboardModule from "@/components/lms/teacher/TeacherDashboardModule";
import { useAuth } from "@/context/AuthContext";

type RoleKey = "student" | "teacher";

function normalizeRole(role: string): "student" | "teacher" | "administrator" {
  const r = String(role || "").trim().toLowerCase();
  if (r === "super admin" || r === "super-admin" || r === "administrator" || r === "admin") return "administrator";
  if (r === "teacher" || r === "instructor") return "teacher";
  return "student";
}

export default function DashboardRoleClient({ role }: { role: string }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const pathname = usePathname() || "";
  const locale = pathname.split("/")[1] || "";

  const routeRole = normalizeRole(role);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.replace(`/${locale}/lms/login`);
      return;
    }

    const userRole = normalizeRole(user.role || "");
    if (userRole === "administrator") {
      router.replace(`/${locale}/admin/dashboard-selector`);
      return;
    }

    if (routeRole !== userRole) {
      router.replace(`/${locale}/lms/dashboard/${userRole}`);
      return;
    }
  }, [locale, routeRole, router, user, authLoading]);

  if (authLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-lg text-[#c0ddc8]">
        Loading dashboard...
      </div>
    );
  }

  if (routeRole === "teacher") {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <TeacherDashboardModule teacherName={user?.username || "Pastor Samuel"} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <StudentDashboard userName={user?.username || "Muhammad"} />
    </div>
  );
}
