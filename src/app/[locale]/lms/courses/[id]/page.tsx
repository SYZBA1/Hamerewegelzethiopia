"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type CourseDetails = {
  title: string;
  instructor: string;
  progress: number;
  modules: { name: string; lessons: string[] }[];
  currentLesson: string;
  notes: string;
};

const courseData: Record<string, CourseDetails> = {
  "bible-101": {
    title: "Bible Basics",
    instructor: "Pastor Daniel",
    progress: 65,
    modules: [
      { name: "Genesis Overview", lessons: ["Creation", "Fall", "Covenant"] },
      { name: "Gospels", lessons: ["Matthew", "Mark", "Luke", "John"] },
    ],
    currentLesson: "Creation",
    notes: "In this lesson we cover the Genesis creation account.",
  },
  "history-faith": {
    title: "Church History",
    instructor: "Sis. Eleni",
    progress: 28,
    modules: [{ name: "Reformation", lessons: ["Martin Luther", "Calvin", "Wycliffe"] }],
    currentLesson: "Martin Luther",
    notes: "Study the early reformers and their impact.",
  },
  leadership: {
    title: "Ministry Leadership",
    instructor: "Dr. Amanuel",
    progress: 90,
    modules: [{ name: "Servant Leadership", lessons: ["Humility", "Vision", "Discipleship"] }],
    currentLesson: "Vision",
    notes: "Focus on the servant leadership model in ministry.",
  },
};


export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const course = courseData[params.id];

  useEffect(() => {
    const auth = localStorage.getItem("lmsAuth");
    if (!auth) router.replace("/lms/login");
  }, [router]);

  if (!course) {
    return (
      <main className="mx-auto min-h-screen max-w-6xl p-4 text-slate-100">
        <p>Course not found.</p>
        <Link href="/lms/courses" className="text-amber-300 underline">Back to courses</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl p-4 text-slate-100">
      <div className="mb-4 flex flex-wrap justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-amber-200">{course.title}</h1>
          <p className="text-sm text-slate-300">Instructor: {course.instructor}</p>
          <p className="text-xs text-slate-400">Progress: {course.progress}%</p>
        </div>
        <Link href="/lms/courses" className="rounded-lg border border-amber-300 px-3 py-1 text-slate-100 hover:bg-amber-500/20">
          Back to Courses
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="col-span-1 rounded-xl border border-amber-300/30 bg-slate-900/80 p-4">
          <h2 className="text-xl font-semibold text-amber-200">Module List</h2>
          {course.modules.map((module) => (
            <div key={module.name} className="mt-3">
              <p className="text-sm font-medium text-slate-100">{module.name}</p>
              <ul className="mt-1 space-y-1 text-sm text-slate-300">
                {module.lessons.map((lesson) => (
                  <li
                    key={lesson}
                    className={`rounded-md px-2 py-1 ${lesson === course.currentLesson ? "bg-amber-400/25 text-amber-100" : "bg-slate-800/60"}`}
                  >
                    {lesson}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="col-span-2 rounded-xl border border-amber-300/30 bg-slate-900/80 p-4">
          <h2 className="text-xl font-semibold text-amber-200">Current Lesson</h2>
          <p className="mt-1 text-lg text-slate-100">{course.currentLesson}</p>
          <div className="mt-3 rounded-lg bg-slate-800 p-3 text-sm text-slate-200">
            <p>{course.notes}</p>
            <p className="mt-2 text-xs text-slate-400">Downloadable materials: course-guide.pdf (mock)</p>
          </div>

          <div className="mt-4 rounded-lg border border-amber-300/20 bg-slate-800 p-3 text-sm text-slate-200">
            <h3 className="font-semibold text-amber-200">Notes</h3>
            <textarea
              className="mt-2 h-24 w-full resize-none rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-100 focus:border-amber-300 focus:outline-none"
              defaultValue={course.notes}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
