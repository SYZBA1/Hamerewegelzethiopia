"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  status?: string;
  enrolledStudents?: string[];
}

export default function CourseManager() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Beginner"
  });
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchCourses = async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/courses?instructor=${user._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('lms_token')}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setCourses(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('lms_token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Course created successfully!" });
        setFormData({ title: "", description: "", category: "", difficulty: "Beginner" });
        setTimeout(() => setIsModalOpen(false), 2000);
        fetchCourses();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to create course" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl text-slate-100">
        <h2 className="text-xl font-bold text-white">Course Management Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl bg-[#d6ff00] px-4 py-2 text-sm font-semibold text-[#08120f] hover:bg-[#c4eb00] transition-colors"
          >
            Create Course
          </button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/5 transition-colors">Edit Course</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/5 transition-colors">Delete Course</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/5 transition-colors">Publish Course</button>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Your Courses</h3>
        {loading ? (
          <p className="text-slate-400 mt-4">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-slate-400 mt-4">You haven't created any courses yet.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <article key={course._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="h-24 rounded-xl bg-gradient-to-r from-[#2a3f2d] to-[#597363]" />
                <h4 className="mt-3 font-semibold text-white">{course.title}</h4>
                <p className="mt-1 text-xs text-slate-400">{course.category} • {course.difficulty}</p>
                <p className="mt-1 text-xs text-slate-400">Students: {course.enrolledStudents?.length || 0}</p>
                <button className="mt-3 rounded-lg border border-white/20 px-3 py-1.5 text-xs text-slate-100 hover:bg-white/5">Edit Course</button>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Create Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111f16] p-8 shadow-2xl text-slate-100">
            <h3 className="text-2xl font-bold text-white">Create New Course</h3>
            <p className="text-sm text-slate-400 mt-1">Fill in the details to launch your new course.</p>
            
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Course Title</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm focus:border-[#d6ff00] focus:outline-none"
                  placeholder="e.g. Introduction to Theology"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Category</label>
                <input
                  required
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm focus:border-[#d6ff00] focus:outline-none"
                  placeholder="e.g. Biblical Studies"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm focus:border-[#d6ff00] focus:outline-none appearance-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Description</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm focus:border-[#d6ff00] focus:outline-none"
                  placeholder="Describe what students will learn..."
                />
              </div>

              {message.text && (
                <p className={`text-sm font-medium ${message.type === 'success' ? 'text-[#d6ff00]' : 'text-red-400'}`}>
                  {message.text}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-xl border border-white/10 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={formLoading}
                  type="submit"
                  className="flex-1 rounded-xl bg-[#d6ff00] py-3 text-sm font-semibold text-[#08120f] hover:bg-[#c4eb00] transition-colors disabled:opacity-50"
                >
                  {formLoading ? "Creating..." : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Course Content Management</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          <div className="rounded-2xl bg-white/5 p-4 text-slate-200">Lessons</div>
          <div className="rounded-2xl bg-white/5 p-4 text-slate-200">Quizzes</div>
          <div className="rounded-2xl bg-white/5 p-4 text-slate-200">Assignments</div>
          <div className="rounded-2xl bg-white/5 p-4 text-slate-200">Resources</div>
          <div className="rounded-2xl bg-white/5 p-4 text-slate-200">Certificates</div>
        </div>
      </section>
    </div>
  );
}
