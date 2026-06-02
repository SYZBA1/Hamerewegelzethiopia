"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Calendar | Student Dashboard | Hamere Wengel LMS",
  description: "View your classes, events, deadlines, and academic schedule",
};

export default function StudentCalendarPage() {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("lmsAuth");
    if (!auth) router.replace("/lms/login");
  }, [router]);

  return (
    <main className="mx-auto min-h-screen max-w-6xl p-4 text-slate-100">
      <h1 className="text-3xl font-semibold text-emerald-200">Calendar</h1>
      <p className="mt-3 max-w-2xl text-slate-300">
        Your course schedule, events, and live classes are tracked here. Use this space to manage your learning timetable.
      </p>
    </main>
  );
}