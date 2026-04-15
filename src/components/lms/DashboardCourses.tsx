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
    <div className="card-gradient-glass p-5 shadow-lg shadow-[#E3EF26]/10">
      <h2 className="text-xl font-semibold text-[#FFFDEE]">{title}</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {courses.map((course) => (
          <div key={course.title} className="rounded-xl border border-white/20 bg-gradient-to-b from-[#E2FBCE]/15 to-[#076653]/50 p-4">
            <h3 className="text-sm font-semibold text-[#FFFDEE]">{course.title}</h3>
            <div className="mt-2 h-2 w-full rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#E3EF26] to-[#076653]"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-[#E2FBCE]">{course.progress}% Complete</p>
            {course.onAction && (
              <button
                onClick={course.onAction}
                className="btn-primary-gradient mt-3 px-3 py-2 text-xs font-semibold"
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