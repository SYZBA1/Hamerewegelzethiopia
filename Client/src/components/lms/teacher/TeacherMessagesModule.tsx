const inbox = [
  "Student Messages: 4 unread",
  "Admin Notifications: Timetable update",
  "Course Discussions: 12 new replies",
];

export default function TeacherMessagesModule() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white">Inbox</h2>
        <div className="mt-4 space-y-2">
          {inbox.map((entry) => (
            <p key={entry} className="rounded-xl bg-white/5 px-3 py-2 text-sm text-slate-200">{entry}</p>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Chat Features</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Direct Messaging</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Group Chats</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Send Files</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Voice Notes</button>
        </div>
      </section>
    </div>
  );
}
