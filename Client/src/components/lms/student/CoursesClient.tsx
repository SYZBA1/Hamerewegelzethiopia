"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import CourseGrid from "./courses/CourseGrid";
import type { Course } from "./courses/courseData";

const API_URL = "http://localhost:5000/api/v1";

export default function CoursesClient() {
  const pathname = usePathname() || "";
  const locale = pathname.split("/")[1] || "en";

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterInstructor, setFilterInstructor] = useState("all");
  const [sortBy, setSortBy] = useState("progress");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/courses`);
        const data = await res.json();
        if (data.success) {
          // Map _id to id and ensure all fields match the Course interface
          const mapped: Course[] = data.data.map((c: any) => ({
            ...c,
            id: c._id,
            enrolled: false,
            progress: 0,
            lessons: c.lessons || [],
            outcomes: c.outcomes || []
          }));
          setCourses(mapped);
        } else {
          setError("Failed to load courses");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error connecting to server");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const instructors = useMemo(
    () => ["all", ...new Set(courses.map((course: Course) => 
      typeof course.instructor === 'object' ? course.instructor.username : course.instructor
    ))],
    [courses]
  );

  const filteredCourses = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const base = courses.filter((course: any) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        course.title.toLowerCase().includes(normalizedSearch);
      const matchesCategory =
        filterCategory === "all" || course.category.toLowerCase() === filterCategory.toLowerCase();
      const matchesInstructor =
        filterInstructor === "all" ||
        (typeof course.instructor === 'object' ? course.instructor.username : course.instructor) === filterInstructor;

      return matchesSearch && matchesCategory && matchesInstructor;
    });

    const sorted = [...base];
    // Progress sorting might not work yet since it's not in the model per student yet
    return sorted;
  }, [courses, filterCategory, filterInstructor, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#d6ff00]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-sm underline">Try again</button>
      </div>
    );
  }

  const enrolled = filteredCourses.filter((course) => course.enrolled);
  const available = filteredCourses.filter((course) => !course.enrolled);
  const recommended = available.filter((course) => course.isPopular || course.isNew);

  const enrolledAll = courses.filter((course) => course.enrolled);
  const completedCount = enrolledAll.filter((course) => course.progress >= 100).length;
  const activeCount = enrolledAll.filter((course) => course.progress > 0 && course.progress < 100).length;
  const pendingCount = enrolledAll.filter((course) => course.progress === 0).length;
  const avgProgress =
    enrolledAll.length > 0
      ? Math.round(
          enrolledAll.reduce((acc, course) => acc + course.progress, 0) / enrolledAll.length
        )
      : 0;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h1 className="mb-1 text-2xl font-bold text-white">Courses Page</h1>
        <p className="mb-4 text-sm text-slate-300">Search, filter, and track your learning progress.</p>

        <div className="grid gap-3 lg:grid-cols-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-3 text-slate-400"/>
            <input
              type="text"
              placeholder="Search by course name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:border-[#d6ff00]/50 focus:outline-none"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 focus:border-[#d6ff00]/50 focus:outline-none"
          >
            <option value="all">Filter by Category</option>
            <option value="theology">Theology</option>
            <option value="ministry">Ministry</option>
            <option value="history">History</option>
            <option value="leadership">Leadership</option>
            <option value="practical">Practical</option>
          </select>

          <select
            value={filterInstructor}
            onChange={(e) => setFilterInstructor(e.target.value)}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 focus:border-[#d6ff00]/50 focus:outline-none"
          >
            <option value="all">Filter by Instructor</option>
            {instructors
              .filter((name) => name !== "all")
              .map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 focus:border-[#d6ff00]/50 focus:outline-none"
          >
            <option value="progress">Sort by Progress</option>
            <option value="new">Sort by New</option>
            <option value="popular">Sort by Popular</option>
          </select>
        </div>
      </div>

      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="mb-4 text-xl font-bold text-white">Course Progress Overview</h2>
        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-xs text-slate-400">Completed Courses</p>
            <p className="mt-1 text-2xl font-bold text-white">{completedCount}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-xs text-slate-400">Active Courses</p>
            <p className="mt-1 text-2xl font-bold text-white">{activeCount}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-xs text-slate-400">Pending Courses</p>
            <p className="mt-1 text-2xl font-bold text-white">{pendingCount}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-xs text-slate-400">Average Progress</p>
            <p className="mt-1 text-2xl font-bold text-[#d6ff00]">{avgProgress}%</p>
          </div>
        </div>
      </section>

      <CourseGrid title="Enrolled Courses Grid" courses={enrolled} locale={locale} />
      <CourseGrid title="Available Courses Section" courses={available} locale={locale} />
      <CourseGrid title="Recommended Courses" courses={recommended} locale={locale} />
    </div>
  );
}
