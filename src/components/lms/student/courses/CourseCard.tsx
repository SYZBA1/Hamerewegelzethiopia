import Link from "next/link";
import Image from "next/image";
import type { Course } from "./courseData";
import ProgressBar from "./ProgressBar";
import EnrollButton from "./EnrollButton";

interface CourseCardProps {
  course: Course;
  locale: string;
}

export default function CourseCard({ course, locale }: CourseCardProps) {
  return (
    <article className="group rounded-3xl border border-white/15 bg-[#162b1d] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d6ff00]/30 hover:shadow-lg hover:shadow-black/30">
      <Image
        src={course.thumbnail}
        alt={course.title}
        width={720}
        height={320}
        className="mb-4 h-36 w-full rounded-2xl object-cover ring-1 ring-white/10"
      />

      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white">{course.title}</h3>
          <p className="mt-1 text-xs text-slate-400">{course.instructor}</p>
        </div>
        <span className="rounded-full bg-[#d6ff00]/20 px-2 py-1 text-[0.65rem] font-semibold text-[#a5ff63]">
          {course.category}
        </span>
      </div>

      <div className="mb-3 flex flex-wrap gap-2 text-[0.65rem] text-slate-300">
        <span className="rounded-full bg-white/15 px-2 py-0.5">{course.duration}</span>
        <span className="rounded-full bg-white/15 px-2 py-0.5">{course.difficulty}</span>
        <span className="rounded-full bg-white/15 px-2 py-0.5">{course.lessonsCount} lessons</span>
        {course.isPopular && <span className="rounded-full bg-[#2e7d52]/40 px-2 py-0.5 text-[#a5ff63]">Popular</span>}
        {course.isNew && <span className="rounded-full bg-sky-500/30 px-2 py-0.5 text-sky-200">New</span>}
      </div>

      {course.enrolled ? (
        <div className="mb-4">
          <ProgressBar value={course.progress} />
        </div>
      ) : (
        <p className="mb-4 text-xs leading-relaxed text-slate-400">{course.description}</p>
      )}

      <div className="grid grid-cols-2 gap-2">
        <Link
          href={`/${locale}/lms/dashboard/student/courses/${course.id}`}
          className="rounded-2xl border border-white/15 px-3 py-2 text-center text-xs font-semibold text-slate-100 transition-colors hover:bg-white/10"
        >
          View Details
        </Link>
        <EnrollButton enrolled={course.enrolled} />
      </div>
    </article>
  );
}
