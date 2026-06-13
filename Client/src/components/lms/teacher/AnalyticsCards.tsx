const kpis = [
  { label: "Student Performance", value: "87%", note: "Average across active classes" },
  { label: "Course Completion", value: "72%", note: "Across current semester" },
  { label: "Attendance Analytics", value: "89%", note: "Average class attendance" },
  { label: "Assignments Reviewed", value: "124", note: "This month" },
];

export default function AnalyticsCards() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white">Dashboard Analytics</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
              <p className="mt-2 text-2xl font-bold text-white">{item.value}</p>
              <p className="mt-1 text-xs text-slate-400">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Reports</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="rounded-xl bg-[#d6ff00] px-4 py-2 text-sm font-semibold text-[#08120f]">Export PDF</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100">Export Excel</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100">Performance Reports</button>
        </div>
      </section>
    </div>
  );
}
