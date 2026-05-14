export default function TeacherSettingsModule() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white">Account Settings</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Profile Settings</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Password Management</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Language Settings</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Theme Preferences</button>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Notification Settings</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Email Alerts</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Assignment Notifications</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Student Activity Alerts</button>
        </div>
      </section>
    </div>
  );
}
