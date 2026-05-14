const students = [
  { name: "Samuel Bekele", email: "samuel@saintcyril.edu", progress: "78%", attendance: "92%", performance: "A-" },
  { name: "Liya Tesfaye", email: "liya@saintcyril.edu", progress: "84%", attendance: "95%", performance: "A" },
  { name: "Abel Worku", email: "abel@saintcyril.edu", progress: "63%", attendance: "81%", performance: "B" },
];

export default function StudentTable() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white">Student List</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="text-left text-slate-400">
                <th className="px-3 py-2">Student Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Progress</th>
                <th className="px-3 py-2">Attendance</th>
                <th className="px-3 py-2">Performance</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.email} className="border-t border-white/10 text-slate-100">
                  <td className="px-3 py-3">{student.name}</td>
                  <td className="px-3 py-3">{student.email}</td>
                  <td className="px-3 py-3">{student.progress}</td>
                  <td className="px-3 py-3">{student.attendance}</td>
                  <td className="px-3 py-3">{student.performance}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button className="rounded-lg border border-white/20 px-2 py-1 text-xs">View Profile</button>
                      <button className="rounded-lg border border-white/20 px-2 py-1 text-xs">Send Message</button>
                      <button className="rounded-lg border border-white/20 px-2 py-1 text-xs">Track Performance</button>
                      <button className="rounded-lg border border-white/20 px-2 py-1 text-xs">Export Reports</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Student Detail View</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          <div className="rounded-2xl bg-white/5 p-4 text-slate-200">Courses Enrolled: 4</div>
          <div className="rounded-2xl bg-white/5 p-4 text-slate-200">Grades: A-, B+, A</div>
          <div className="rounded-2xl bg-white/5 p-4 text-slate-200">Assignments Submitted: 17</div>
          <div className="rounded-2xl bg-white/5 p-4 text-slate-200">Activity Timeline: Active</div>
        </div>
      </section>
    </div>
  );
}
