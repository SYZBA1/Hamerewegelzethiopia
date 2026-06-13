"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import CourseGrid from "./courses/CourseGrid";
import { courses } from "./courses/courseData";

export default function CoursesClient() {
  const pathname = usePathname() || "";
  const locale = pathname.split("/")[1] || "en";

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterInstructor, setFilterInstructor] = useState("all");
  const [sortBy, setSortBy] = useState("progress");

  const instructors = useMemo(
    () => ["all", ...new Set(courses.map((course) => course.instructor))],
    []
  );

  const filteredCourses = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const base = courses.filter((course) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        course.title.toLowerCase().includes(normalizedSearch);
      const matchesCategory =
        filterCategory === "all" || course.category.toLowerCase() === filterCategory.toLowerCase();
      const matchesInstructor =
        filterInstructor === "all" || course.instructor === filterInstructor;

      return matchesSearch && matchesCategory && matchesInstructor;
    });

    const sorted = [...base];

    if (sortBy === "progress") {
      sorted.sort((a, b) => b.progress - a.progress);
    } else if (sortBy === "new") {
      sorted.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
    } else if (sortBy === "popular") {
      sorted.sort((a, b) => Number(Boolean(b.isPopular)) - Number(Boolean(a.isPopular)));
    }

    return sorted;
  }, [filterCategory, filterInstructor, searchTerm, sortBy]);

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
