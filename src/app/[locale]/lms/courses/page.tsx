"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const sampleCourses = [
  { id: "bible-101", title: "Bible Basics", instructor: "Pastor Daniel", progress: 65 },
  { id: "history-faith", title: "Church History", instructor: "Sis. Eleni", progress: 28 },
  { id: "leadership", title: "Ministry Leadership", instructor: "Dr. Amanuel", progress: 90 },
];

function getProgressColor(progress: number) {
  if (progress >= 90) return "bg-emerald-400";
  if (progress >= 60) return "bg-amber-300";
  return "bg-sky-400";
}

export default function LMSCoursesPage() {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("lmsAuth");
    if (!auth) router.replace("/lms/login");
  }, [router]);

  return (
    <main className="mx-auto min-h-screen max-w-7xl p-4 text-slate-100">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold text-amber-200">Courses</h1>
        <Link
          href="/lms/dashboard"
          className="rounded-lg border border-amber-300 px-4 py-2 text-amber-200 hover:bg-limeCTA/20"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sampleCourses.map((course) => (
          <article key={course.id} className="rounded-xl border border-amber-300/30 bg-slate-900/80 p-4">
            <h2 className="text-xl font-semibold text-amber-200">{course.title}</h2>
            <p className="text-sm text-slate-300">Instructor: {course.instructor}</p>
            <div className="mt-3 h-2 w-full rounded-full bg-slate-700">
              <div className={`h-full rounded-full ${getProgressColor(course.progress)}`} style={{ width: `${course.progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-slate-300">Progress: {course.progress}%</p>
            <Link
              href={`/lms/courses/${course.id}`}
              className="mt-3 inline-flex rounded-lg bg-limeCTA px-3 py-2 text-sm font-medium text-[#1B1B1B] hover:bg-primaryBg"
            >
              Continue Learning
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
