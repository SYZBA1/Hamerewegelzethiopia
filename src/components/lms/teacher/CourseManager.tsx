const courseItems = [
  { name: "Biblical Hermeneutics", students: 36, progress: "74%", status: "Published" },
  { name: "Pastoral Counseling", students: 28, progress: "68%", status: "Published" },
  { name: "Church Leadership", students: 41, progress: "82%", status: "Draft" },
];

export default function CourseManager() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white">Course Management Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="rounded-xl bg-[#d6ff00] px-4 py-2 text-sm font-semibold text-[#08120f]">Create Course</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100">Edit Course</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100">Delete Course</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100">Publish Course</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100">Upload Materials</button>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Course Grid</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courseItems.map((course) => (
            <article key={course.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="h-24 rounded-xl bg-gradient-to-r from-[#2a3f2d] to-[#597363]" />
              <h4 className="mt-3 font-semibold text-white">{course.name}</h4>
              <p className="mt-1 text-xs text-slate-400">Students: {course.students}</p>
              <p className="text-xs text-slate-400">Progress Overview: {course.progress}</p>
              <p className="text-xs text-[#d6ff00]">{course.status}</p>
              <button className="mt-3 rounded-lg border border-white/20 px-3 py-1.5 text-xs text-slate-100">Edit Course</button>
            </article>
          ))}
        </div>
      </section>

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
