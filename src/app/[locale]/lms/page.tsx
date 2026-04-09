import Link from "next/link";

export default function LMSIndexPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-white/20 bg-[#163832]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <h1 className="text-center text-4xl font-bold text-white">LMS Portal</h1>
        <p className="mt-3 text-center text-sm text-[#c0ddc8]">A spiritual learning experience. Login or register to begin.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link
            href="/lms/login"
            className="rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-3 text-center font-semibold text-[#091913] shadow-lg shadow-amber-400/30 hover:shadow-[0_0_25px_rgba(250,202,21,0.65)]"
          >
            Login
          </Link>
          <Link
            href="/lms/register"
            className="rounded-xl border border-white/20 bg-[#0B2B26]/80 px-6 py-3 text-center font-semibold text-white hover:bg-[#235347]"
          >
            Register
          </Link>
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/10 p-4 text-center text-sm text-[#c7e2d3]">
          <p className="font-semibold text-white">Try sample credentials</p>
          <p>Student: student@example.com / Password123!</p>
          <p>Teacher: teacher@example.com / Teacher123!</p>
          <p>Administrator: admin@example.com / Admin123!</p>
        </div>
      </div>
    </main>
  );
}
