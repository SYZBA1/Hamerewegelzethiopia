import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, findCourseById } from "@/components/lms/student/courses/courseData";

export function generateStaticParams() {
  const locales = ["en", "am"];
  const params: Array<{ locale: string; courseId: string; lessonId: string }> = [];

  for (const locale of locales) {
    for (const course of courses) {
      for (const lesson of course.lessons) {
        params.push({ locale, courseId: course.id, lessonId: lesson.id });
      }
    }
  }

  return params;
}

export default function StudentLessonPage({
  params,
}: {
  params: { locale: string; courseId: string; lessonId: string };
}) {
  const course = findCourseById(params.courseId);
  if (!course) notFound();

  const lesson = course.lessons.find((item) => item.id === params.lessonId);
  if (!lesson) notFound();

  return (
    <main className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[#a5ff63]">Lesson</p>
        <h1 className="mt-2 text-2xl font-bold text-white">{lesson.title}</h1>
        <p className="mt-2 text-sm text-slate-300">
          Type: {lesson.type} | Duration: {lesson.duration}
        </p>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
          This lesson content area is ready for video, document, and reading material integration.
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-xl border border-white/15 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-white/10">
            Mark as complete
          </button>
          <button className="rounded-xl border border-white/15 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-white/10">
            Download resources
          </button>
          <Link
            href={`/${params.locale}/lms/dashboard/student/courses/${params.courseId}`}
            className="rounded-xl border border-white/15 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-white/10"
          >
            Back to course detail
          </Link>
        </div>
      </section>
    </main>
  );
}
