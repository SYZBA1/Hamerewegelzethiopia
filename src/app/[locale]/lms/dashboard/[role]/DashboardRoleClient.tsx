"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import DashboardHeader from "@/components/lms/DashboardHeader";
import DashboardStats from "@/components/lms/DashboardStats";
import DashboardCourses from "@/components/lms/DashboardCourses";
import DashboardActivity from "@/components/lms/DashboardActivity";
import StudentDashboard from "@/components/lms/StudentDashboard";

type RoleKey = "student" | "teacher" | "administrator";

const roleConfig: Record<RoleKey, {
  title: string;
  subtitle: string;
  stats: Array<{ label: string; value: number }>;
  coursesTitle: string;
  courses: Array<{ title: string; progress: number }>;
  activities: string[];
  primaryAction?: { label: string; href: string };
}> = {
  student: {
    title: "Student Dashboard",
    subtitle: "Welcome back, {name}. Continue your spiritual journey.",
    stats: [
      { label: "Enrolled", value: 5 },
      { label: "Completed", value: 2 },
      { label: "Pending", value: 3 },
    ],
    coursesTitle: "Continue Learning",
    courses: [
      { title: "Introduction to Theology", progress: 75 },
      { title: "Biblical Studies", progress: 45 },
      { title: "Church History", progress: 90 },
    ],
    activities: [
      "Completed lesson 3 of Biblical Studies",
      "Asked a question in Church History forum",
      "Uploaded assignment for Introduction to Theology",
    ],
    primaryAction: { label: "My Courses", href: "/lms/courses" },
  },
  teacher: {
    title: "Teacher Dashboard",
    subtitle: "Welcome back, {name}. Manage your courses and students.",
    stats: [
      { label: "Active Courses", value: 4 },
      { label: "Total Students", value: 156 },
      { label: "Assignments to Grade", value: 23 },
    ],
    coursesTitle: "Course Management",
    courses: [
      { title: "Advanced Biblical Studies", progress: 85 },
      { title: "Theology 201", progress: 60 },
      { title: "Church Leadership", progress: 95 },
    ],
    activities: [
      "Graded 5 assignments for Biblical Studies",
      "Created new lesson in Theology 201",
      "Responded to 3 student questions",
      "Updated course syllabus for Church Leadership",
    ],
    primaryAction: { label: "Manage Courses", href: "/lms/courses" },
  },
  administrator: {
    title: "Admin Dashboard",
    subtitle: "Welcome back, {name}. Oversee system operations.",
    stats: [
      { label: "Total Users", value: 1247 },
      { label: "Active Courses", value: 28 },
      { label: "Revenue This Month", value: 15420 },
    ],
    coursesTitle: "System Overview",
    courses: [
      { title: "User Engagement", progress: 78 },
      { title: "Course Completion Rate", progress: 65 },
      { title: "System Performance", progress: 92 },
    ],
    activities: [
      "Processed 12 new user registrations",
      "Generated monthly analytics report",
      "Resolved 3 system tickets",
      "Updated course catalog with 5 new courses",
    ],
    primaryAction: { label: "User Management", href: "/lms/users" },
  },
};

export default function DashboardRoleClient({ role }: { role: string }) {
  const router = useRouter();
  const pathname = usePathname() || "";
  const locale = pathname.split("/")[1] || "";

  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const roleKey = (role?.toLowerCase() || "student") as RoleKey;
  const config = roleConfig[roleKey];

  useEffect(() => {
    const auth = localStorage.getItem("lmsAuth");
    if (!auth) {
      router.replace(`/${locale}/lms/login`);
      return;
    }

    try {
      const parsed = JSON.parse(auth);
      if (!parsed?.user?.email) {
        router.replace(`/${locale}/lms/login`);
        return;
      }
      if (parsed.user.role?.toLowerCase() !== roleKey) {
        router.replace(`/${locale}/lms/dashboard/${parsed.user.role?.toLowerCase() || "student"}`);
        return;
      }
      setUser(parsed.user);
      setLoading(false);
    } catch {
      router.replace(`/${locale}/lms/login`);
    }
  }, [locale, roleKey, router]);

  const logout = () => {
    localStorage.removeItem("lmsAuth");
    router.push(`/${locale}/lms/login`);
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-lg text-[#c0ddc8]">
        Loading dashboard...
      </div>
    );
  }

  if (roleKey === "student") {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <StudentDashboard userName={user?.name || "Muhammad"} onLogout={logout} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <DashboardHeader
        title={config.title}
        subtitle={config.subtitle}
        userName={user?.name || "Learner"}
        primaryAction={config.primaryAction}
        secondaryAction={{ label: "Logout", onClick: logout }}
      />

      <DashboardStats stats={config.stats} />

      <DashboardCourses title={config.coursesTitle} courses={config.courses} />

      <DashboardActivity title="Recent Activity" activities={config.activities} />
    </div>
  );
}
