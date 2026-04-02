"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LMSDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("lmsAuth");
    if (!auth) {
      router.replace("/lms/login");
      return;
    }

    try {
      const parsed = JSON.parse(auth);
      if (!parsed?.user?.email) {
        router.replace("/lms/login");
        return;
      }
      setUser(parsed.user);
    } catch {
      router.replace("/lms/login");
    }
  }, [router]);

  function logout() {
    localStorage.removeItem("lmsAuth");
    router.push("/lms/login");
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl p-4 text-slate-100">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300/40 bg-slate-800/70 p-4">
        <div>
          <h1 className="text-2xl font-semibold text-amber-200">LMS Dashboard</h1>
          <p className="text-sm text-slate-300">Welcome back, {user?.name ?? "Learner"}.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={logout}
            className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-400"
          >
            Logout
          </button>
          <Link href="/lms/courses" className="rounded-lg border border-amber-300 px-4 py-2 text-sm font-semibold hover:bg-amber-500/20">
            Go to Courses
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-amber-300/30 bg-slate-900/80 p-4">
          <h2 className="text-lg font-semibold text-amber-300">Enrolled Courses</h2>
          <p className="text-sm text-slate-300">3 courses</p>
        </div>
        <div className="rounded-xl border border-amber-300/30 bg-slate-900/80 p-4">
          <h2 className="text-lg font-semibold text-amber-300">Completed Courses</h2>
          <p className="text-sm text-slate-300">1 course</p>
        </div>
        <div className="rounded-xl border border-amber-300/30 bg-slate-900/80 p-4">
          <h2 className="text-lg font-semibold text-amber-300">Pending Assignments</h2>
          <p className="text-sm text-slate-300">2 assignments</p>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-amber-300/30 bg-slate-900/80 p-4">
        <h3 className="mb-2 text-xl font-semibold text-amber-200">Spiritual Thought</h3>
        <p className="text-sm text-slate-300">“Commit your work to the LORD, and your plans will be established.” — Proverbs 16:3</p>
      </section>
    </main>
  );
}
