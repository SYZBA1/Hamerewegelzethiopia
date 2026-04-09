"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type RoleKey = "student" | "teacher" | "administrator";

const cardData: Record<RoleKey, { enrolled: number; completed: number; pending: number; title: string }> = {
  student: { enrolled: 5, completed: 2, pending: 3, title: "Student Dashboard" },
  teacher: { enrolled: 12, completed: 6, pending: 2, title: "Teacher Dashboard" },
  administrator: { enrolled: 24, completed: 14, pending: 5, title: "Admin Dashboard" },
};

export default function LMSDashboardRolePage({ params }: { params: { role: string } }) {
  const { role } = params;
  const router = useRouter();
  const pathname = usePathname() || "";
  const locale = pathname.split("/")[1] || "";

  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const roleKey = (role?.toLowerCase() || "student") as RoleKey;
  const roleContent = cardData[roleKey];

  const progressCourses = useMemo(
    () => [
      { title: "Introduction to Theology", progress: 75 },
      { title: "Biblical Studies", progress: 45 },
      { title: "Church History", progress: 90 },
    ],
    [],
  );

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

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-white/20 bg-[#163832]/60 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{roleContent.title}</h1>
          <p className="text-sm text-[#cbe6ce]">Welcome back, {user?.name || "Learner"}. Continue your spiritual journey.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}/lms/courses`}
            className="rounded-xl border border-white/20 bg-[#0B2B26]/80 px-4 py-2 text-sm font-semibold text-[#cbe6ce] hover:bg-[#235347]"
          >
            My Courses
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 text-sm font-bold text-[#091913] shadow-lg shadow-amber-400/40"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg shadow-black/20">
          <p className="text-xs uppercase tracking-widest text-[#8EB69B]">Enrolled</p>
          <p className="mt-2 text-3xl font-bold text-white">{roleContent.enrolled}</p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg shadow-black/20">
          <p className="text-xs uppercase tracking-widest text-[#8EB69B]">Completed</p>
          <p className="mt-2 text-3xl font-bold text-white">{roleContent.completed}</p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg shadow-black/20">
          <p className="text-xs uppercase tracking-widest text-[#8EB69B]">Pending</p>
          <p className="mt-2 text-3xl font-bold text-white">{roleContent.pending}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg shadow-black/20">
        <h2 className="text-xl font-semibold text-white">Continue Learning</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {progressCourses.map((course) => (
            <div key={course.title} className="rounded-xl border border-white/20 bg-[#0B2B26]/70 p-4">
              <h3 className="text-sm font-semibold text-[#c8ddcb]">{course.title}</h3>
              <div className="mt-2 h-2 w-full rounded-full bg-white/20">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" style={{ width: `${course.progress}%` }} />
              </div>
              <p className="mt-2 text-xs text-[#cbe6ce]">{course.progress}% Complete</p>
              <button className="mt-3 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 px-3 py-2 text-xs font-semibold text-[#091913]">Resume</button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg shadow-black/20">
        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
        <ul className="mt-3 space-y-2 text-sm text-[#cbe6ce]">
          <li>• Completed lesson 3 of Biblical Studies</li>
          <li>• Asked a question in Church History forum</li>
          <li>• Uploaded assignment for Introduction to Theology</li>
        </ul>
      </div>
    </div>
  );
}
