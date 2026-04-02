"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";

const MOCK_USERS = [
  { role: "Student", email: "student@example.com", password: "Password123!", name: "Samuel (Student)" },
  { role: "Teacher", email: "teacher@example.com", password: "Teacher123!", name: "Eleni (Teacher)" },
  { role: "Administrator", email: "admin@example.com", password: "Admin123!", name: "Amanuel (Admin)" },
];

export default function LMSLoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(
    () => email.trim().length > 0 && password.trim().length > 0,
    [email, password],
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!canSubmit) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    let savedUsers: any[] = [];
    try {
      savedUsers = JSON.parse(localStorage.getItem("lmsUsers") || "[]");
      if (!Array.isArray(savedUsers)) {
        savedUsers = [];
      }
    } catch (parseError) {
      console.error("Failed to parse lmsUsers from localStorage", parseError);
      savedUsers = [];
    }

    const existing = savedUsers.find(
      (u: any) =>
        String(u?.email || "").trim().toLowerCase() === normalizedEmail &&
        String(u?.password || "").trim() === normalizedPassword &&
        String(u?.role || "") === role,
    );
    const currentMock = MOCK_USERS.find(
      (u) =>
        u.role === role &&
        u.email.trim().toLowerCase() === normalizedEmail &&
        u.password.trim() === normalizedPassword,
    );
    const loggedInUser = existing || currentMock;

    if (loggedInUser) {
      localStorage.setItem("lmsAuth", JSON.stringify({ token: "mock-jwt-token", user: loggedInUser }));
      router.push("/lms/dashboard");
      return;
    }

    setError(`Invalid email or password for ${role} role. Use the sample values shown below.`);
    setLoading(false);
  }

  return (
    <main className="mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-amber-400/30 bg-slate-900/80 p-8 shadow-xl backdrop-blur">
        <h1 className="mb-4 text-center text-3xl font-semibold text-amber-300">LMS Login</h1>
        <p className="mb-1 text-center text-sm text-slate-300">Sign in as:</p>

        <div className="mb-4 flex justify-center gap-2">
          {['Student', 'Teacher', 'Administrator'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRole(item)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                role === item
                  ? 'bg-amber-500 text-[#091913]'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="mb-4 text-center text-xs text-slate-300">
          Signing in as <span className="font-semibold text-amber-200">{role}</span>
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-200">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
              placeholder="student@example.com"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-200">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
              placeholder="Password123!"
              required
            />
          </label>

          {error && <p className="text-sm text-rose-300">{error}</p>}

          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="w-full rounded-lg bg-amber-500 px-4 py-2 font-semibold text-[#091913] hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-5 rounded-lg bg-slate-900 p-3 text-sm text-slate-300">
          <p className="font-semibold text-slate-100">Test credentials</p>
          <p>Student - Email: student@example.com | Password: Password123!</p>
          <p>Teacher - Email: teacher@example.com | Password: Teacher123!</p>
          <p>Administrator - Email: admin@example.com | Password: Admin123!</p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400">If you are already registered, use your own email/password from Register page</p>
          <Link href="/lms/register" className="text-amber-200 hover:text-amber-100 text-sm">
            New user? Register here
          </Link>
        </div>
      </div>
    </main>
  );
}
