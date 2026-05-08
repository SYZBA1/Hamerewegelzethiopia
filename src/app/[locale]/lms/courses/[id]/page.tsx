import CourseClient from "./CourseClient";

export function generateStaticParams() {
  const courseIds = ["bible-101", "history-faith", "leadership"];
  const locales = ["en", "am"];
  const params = [];
  for (const locale of locales) {
    for (const id of courseIds) {
      params.push({ locale, id });
    }
  }
  return params;
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  return <CourseClient id={params.id} />;
}

