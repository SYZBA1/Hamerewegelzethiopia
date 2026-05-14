const stats = [
  { label: "Total Courses", value: 8 },
  { label: "Total Students", value: 142 },
  { label: "Assignments Pending Review", value: 19 },
  { label: "Upcoming Classes", value: 3 },
];

const activities = [
  "Recent Student Submissions: 6 new submissions",
  "New Messages: 4 unread messages from students",
  "Class Notifications: 2 schedule reminders",
  "Recent Enrollments: 5 students joined this week",
];

const classesToday = [
  { title: "Biblical Hermeneutics", time: "09:00 AM", link: "Join Live Session" },
  { title: "Pastoral Counseling", time: "01:30 PM", link: "Join Live Session" },
  { title: "Church Leadership", time: "04:00 PM", link: "Join Live Session" },
];

export default function TeacherDashboardModule({ teacherName }: { teacherName: string }) {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-[#d6ff00]">Welcome Banner</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Welcome Back, {teacherName} 👋</h1>
        <p className="mt-2 text-sm text-slate-300">You have 3 upcoming classes today.</p>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white">Statistics Cards</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Recent Activities</h3>
        <div className="mt-4 space-y-2">
          {activities.map((item) => (
            <p key={item} className="rounded-xl bg-white/5 px-3 py-2 text-sm text-slate-200">{item}</p>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Upcoming Schedule</h3>
        <div className="mt-4 space-y-3">
          {classesToday.map((item) => (
            <div key={item.title} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/5 p-4">
              <div>
                <p className="font-semibold text-white">Today's Classes: {item.title}</p>
                <p className="text-xs text-slate-400">Meeting Time: {item.time}</p>
              </div>
              <button className="rounded-xl border border-white/20 px-3 py-1.5 text-xs font-semibold text-slate-100">{item.link}</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
