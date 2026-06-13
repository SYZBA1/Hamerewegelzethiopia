const events = [
  "Classes: Biblical Hermeneutics - May 15",
  "Meetings: Faculty Planning - May 16",
  "Deadlines: Assignment Review - May 17",
  "Exams: Midterm Theology - May 20",
  "Events: Teacher Workshop - May 22",
];

export default function TeacherCalendarModule() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white">Calendar Events</h2>
        <div className="mt-4 space-y-2">
          {events.map((item) => (
            <p key={item} className="rounded-xl bg-white/5 px-3 py-2 text-sm text-slate-200">{item}</p>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Scheduling Features</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Create Event</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Schedule Class</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Send Reminders</button>
        </div>
      </section>
    </div>
  );
}
