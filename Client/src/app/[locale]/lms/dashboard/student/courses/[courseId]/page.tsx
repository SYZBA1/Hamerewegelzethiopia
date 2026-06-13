"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import CourseDetail from "@/components/lms/student/courses/CourseDetail";
import type { Course } from "@/components/lms/student/courses/courseData";

const API_URL = "http://localhost:5000/api/v1";

export default function StudentCourseDetailPage() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const locale = params?.locale as string || "en";

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API_URL}/courses/${courseId}`);
        const data = await res.json();
        if (data.success) {
          setCourse({
            ...data.data,
            id: data.data._id,
            enrolled: false, // Handle enrollment status if needed
            progress: 0,
            lessons: (data.data.lessons || []).map((l: any) => ({ ...l, id: l._id })),
            outcomes: data.data.outcomes || []
          });
        } else {
          setError("Course not found");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error connecting to server");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#d6ff00]" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-4">
        <p className="text-red-400">{error || "Course not found"}</p>
        <button onClick={() => window.history.back()} className="text-sm underline text-slate-300">Go back</button>
      </div>
    );
  }

  return <CourseDetail course={course} locale={locale} />;
}
