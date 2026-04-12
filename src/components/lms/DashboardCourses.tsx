"use client";

import { memo } from "react";

interface CourseProgress {
  title: string;
  progress: number;
  actionLabel?: string;
  onAction?: () => void;
}

interface DashboardCoursesProps {
  title: string;
  courses: CourseProgress[];
}

const DashboardCourses = memo(function DashboardCourses({ title, courses }: DashboardCoursesProps) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg shadow-black/20">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {courses.map((course) => (
          <div key={course.title} className="rounded-xl border border-white/20 bg-[#0B2B26]/70 p-4">
            <h3 className="text-sm font-semibold text-[#c8ddcb]">{course.title}</h3>
            <div className="mt-2 h-2 w-full rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-[#cbe6ce]">{course.progress}% Complete</p>
            {course.onAction && (
              <button
                onClick={course.onAction}
                className="mt-3 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 px-3 py-2 text-xs font-semibold text-[#091913]"
              >
                {course.actionLabel || "Resume"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default DashboardCourses;