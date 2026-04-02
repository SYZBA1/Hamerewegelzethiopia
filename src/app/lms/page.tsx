import Link from "next/link";

export default function LMSIndexPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center p-4 text-center text-white">
      <h1 className="mb-4 text-4xl font-semibold">LMS Portal</h1>
      <p className="mb-6 max-w-xl text-lg text-slate-100">
        Please login first. If you have no account, use the mock credentials below:
      </p>
      <div className="space-y-1 rounded-xl bg-slate-800/70 p-4">
        <p>
          <strong>Existing Account</strong>
        </p>
        <p>
          <strong>Email:</strong> student@example.com
        </p>
        <p>
          <strong>Password:</strong> Password123!
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/lms/login"
          className="inline-flex rounded-lg bg-amber-500 px-6 py-2 font-medium text-[#091913] hover:bg-amber-400"
        >
          Login
        </Link>
        <Link
          href="/lms/register"
          className="inline-flex rounded-lg border border-amber-300 bg-transparent px-6 py-2 font-medium text-amber-200 hover:bg-amber-500/20"
        >
          Register
        </Link>
      </div>
    </main>
  );
}
