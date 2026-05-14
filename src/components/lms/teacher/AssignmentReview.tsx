const submissions = [
  { student: "Samuel Bekele", title: "Hermeneutics Reflection", submitted: "May 13, 2026", status: "Pending" },
  { student: "Liya Tesfaye", title: "Leadership Essay", submitted: "May 12, 2026", status: "Reviewed" },
  { student: "Abel Worku", title: "Pastoral Case Study", submitted: "May 11, 2026", status: "Pending" },
];

export default function AssignmentReview() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white">Create Assignment</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white" placeholder="Assignment Title" />
          <input className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white" placeholder="Due Date" />
          <input className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white" placeholder="Assign to Course" />
          <input className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white" placeholder="Attach Files" />
          <textarea className="sm:col-span-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white" rows={4} placeholder="Description" />
          <button className="sm:col-span-2 rounded-xl bg-[#d6ff00] px-4 py-2 text-sm font-semibold text-[#08120f]">Publish Assignment</button>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Submitted Assignments</h3>
        <div className="mt-4 space-y-3">
          {submissions.map((item) => (
            <div key={item.student + item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.student} • {item.submitted}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-200">{item.status}</span>
                  <button className="rounded-lg border border-white/20 px-3 py-1 text-xs text-slate-100">Review</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Grading System</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="rounded-xl border border-white/20 px-3 py-2 text-sm text-slate-100">Add Grade</button>
          <button className="rounded-xl border border-white/20 px-3 py-2 text-sm text-slate-100">Feedback Comments</button>
          <button className="rounded-xl border border-white/20 px-3 py-2 text-sm text-slate-100">Rubrics</button>
          <button className="rounded-xl border border-white/20 px-3 py-2 text-sm text-slate-100">Return Assignment</button>
        </div>
      </section>
    </div>
  );
}
