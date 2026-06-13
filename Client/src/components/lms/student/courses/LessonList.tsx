import Link from "next/link";
import type { Lesson } from "./courseData";

interface LessonListProps {
  lessons: Lesson[];
  locale: string;
  courseId: string;
}

function lessonTypeLabel(type: Lesson["type"]) {
  if (type === "video") return "Video";
  if (type === "document") return "Document";
  return "Reading";
}

export default function LessonList({ lessons, locale, courseId }: LessonListProps) {
  return (
    <div className="space-y-3">
      {lessons.map((lesson, index) => (
        <div key={lesson.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs text-slate-400">Lesson {index + 1}</p>
              <h4 className="text-sm font-semibold text-white">{lesson.title}</h4>
            </div>
            <div className="flex items-center gap-2 text-[0.65rem]">
              <span className="rounded-full bg-white/10 px-2 py-1 text-slate-300">{lessonTypeLabel(lesson.type)}</span>
              <span className="rounded-full bg-white/10 px-2 py-1 text-slate-300">{lesson.duration}</span>
              {lesson.completed ? (
                <span className="rounded-full bg-[#2e7d52]/40 px-2 py-1 text-[#a5ff63]">Completed</span>
              ) : (
                <span className="rounded-full bg-amber-500/30 px-2 py-1 text-amber-200">Pending</span>
              )}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={`/${locale}/lms/dashboard/student/courses/${courseId}/lessons/${lesson.id}`}
              className="rounded-xl border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10"
            >
              Open Lesson
            </Link>
            <button className="rounded-xl border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10">
              Mark Complete
            </button>
            <button className="rounded-xl border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10">
              Download Resources
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
