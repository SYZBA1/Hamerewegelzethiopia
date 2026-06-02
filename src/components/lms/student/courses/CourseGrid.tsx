import type { Course } from "./courseData";
import CourseCard from "./CourseCard";

interface CourseGridProps {
  title: string;
  courses: Course[];
  locale: string;
}

export default function CourseGrid({ title, courses, locale }: CourseGridProps) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-white">{title} ({courses.length})</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} locale={locale} />
        ))}
      </div>
    </section>
  );
}
