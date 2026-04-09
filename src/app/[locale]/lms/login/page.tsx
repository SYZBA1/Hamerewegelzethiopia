"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const MOCK_USERS = [
  { role: "Student", email: "student@example.com", password: "Password123!", name: "Samuel (Student)" },
  { role: "Teacher", email: "teacher@example.com", password: "Teacher123!", name: "Eleni (Teacher)" },
  { role: "Administrator", email: "admin@example.com", password: "Admin123!", name: "Amanuel (Admin)" },
];

export default function LMSLoginPage() {
  const router = useRouter();
  const pathname = usePathname() || "";
  const locale = pathname.split("/")[1] || "";

  const [role, setRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    } catch {
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
      router.push(`/${locale}/lms/dashboard/${role.toLowerCase()}`);
      return;
    }

    setError("Invalid email or password");
    setLoading(false);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-[#163832]/80 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <h1 className="mb-3 text-center text-3xl font-bold text-white">LMS Sign In</h1>
        <p className="mb-6 text-center text-sm text-[#c0ddc8]">Choose your role and sign in to continue</p>

        <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {['Student', 'Teacher', 'Administrator'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRole(item)}
              className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                role === item
                  ? 'bg-[#0B2B26] text-[#8EB69B] ring-2 ring-[#8EB69B]/80'
                  : 'bg-[#235347]/70 text-[#dde9e1] hover:bg-[#0B2B26]/80'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#dae9dc]" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-[#163832]/70 px-3 py-2 text-white outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/40"
              placeholder="student@example.com"
              required
            />
          </div>

          <div className="relative space-y-1">
            <label className="text-sm font-semibold text-[#dae9dc]" htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-[#163832]/70 px-3 py-2 text-white outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/40"
              placeholder="Password123!"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-8 text-xs text-[#8EB69B]"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && (
            <div className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 font-bold text-[#091913] shadow-lg shadow-amber-500/30 transition hover:shadow-[0_0_20px_rgba(250,202,21,0.65)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>

          <button
            type="button"
            onClick={() => alert('Google login placeholder')}
            className="w-full rounded-xl border border-white/20 bg-white/90 px-4 py-2 text-sm font-semibold text-[#1f1f1f] transition hover:bg-white"
          >
            Continue with Google
          </button>
        </form>

        <div className="mt-5 grid gap-3 text-center text-xs text-[#c7e2d3]">
          <Link href={`/${locale}/lms/forgot-password`} className="underline hover:text-[#e7f4e5]">
            Forgot password?
          </Link>
          <Link href={`/${locale}/lms/register`} className="font-semibold text-[#8EB69B] hover:text-white">
            New user? Register here
          </Link>
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-[#0B2B26]/60 p-3 text-sm text-[#c7e2d3]">
          <p className="font-semibold text-[#e3f5db]">Test credentials</p>
          <p>Student - student@example.com / Password123!</p>
          <p>Teacher - teacher@example.com / Teacher123!</p>
          <p>Administrator - admin@example.com / Admin123!</p>
        </div>
      </div>
    </main>
  );
}
