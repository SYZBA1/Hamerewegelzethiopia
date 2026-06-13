import { notFound } from "next/navigation";
import CourseDetail from "@/components/lms/student/courses/CourseDetail";
import { courses, findCourseById } from "@/components/lms/student/courses/courseData";

export function generateStaticParams() {
  const locales = ["en", "am"];
  const params: Array<{ locale: string; courseId: string }> = [];

  for (const locale of locales) {
    for (const course of courses) {
      params.push({ locale, courseId: course.id });
    }
  }

  return params;
}

export default function StudentCourseDetailPage({
  params,
}: {
  params: { locale: string; courseId: string };
}) {
  const course = findCourseById(params.courseId);

  if (!course) notFound();

  return <CourseDetail course={course} locale={params.locale} />;
}
