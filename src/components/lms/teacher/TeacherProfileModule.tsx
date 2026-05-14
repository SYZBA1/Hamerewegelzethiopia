const profile = {
  fullName: "Pastor Samuel",
  email: "pastor.samuel@saintcyril.edu",
  phone: "+251 911 222 333",
  department: "Theology",
  specialization: "Pastoral Leadership",
  bio: "Teaching theology and church leadership with 12 years of ministry experience.",
  coursesTeaching: 6,
  experience: "12 years",
  certificates: "M.Div, Leadership Coaching",
  skills: "Curriculum Design, Mentoring, Biblical Exposition",
};

export default function TeacherProfileModule() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white">Personal Information</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
          <p className="rounded-xl bg-white/5 p-3 text-slate-200">Full Name: {profile.fullName}</p>
          <p className="rounded-xl bg-white/5 p-3 text-slate-200">Email: {profile.email}</p>
          <p className="rounded-xl bg-white/5 p-3 text-slate-200">Phone Number: {profile.phone}</p>
          <p className="rounded-xl bg-white/5 p-3 text-slate-200">Department: {profile.department}</p>
          <p className="rounded-xl bg-white/5 p-3 text-slate-200">Specialization: {profile.specialization}</p>
          <p className="rounded-xl bg-white/5 p-3 text-slate-200">Biography: {profile.bio}</p>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Professional Information</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          <p className="rounded-xl bg-white/5 p-3 text-slate-200">Courses Teaching: {profile.coursesTeaching}</p>
          <p className="rounded-xl bg-white/5 p-3 text-slate-200">Experience: {profile.experience}</p>
          <p className="rounded-xl bg-white/5 p-3 text-slate-200">Certificates: {profile.certificates}</p>
          <p className="rounded-xl bg-white/5 p-3 text-slate-200">Skills: {profile.skills}</p>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#111f16]/95 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">Account Settings</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Change Password</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Security Settings</button>
          <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-100">Notification Preferences</button>
        </div>
      </section>
    </div>
  );
}
