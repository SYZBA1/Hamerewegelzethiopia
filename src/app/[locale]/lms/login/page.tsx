"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import LMSAuthShell from "@/components/lms/AuthShell";

const MOCK_USERS = [
  { role: "Student", email: "student@example.com", password: "Password123!", name: "Samuel (Student)" },
  { role: "Teacher", email: "teacher@example.com", password: "Teacher123!", name: "Eleni (Teacher)" },
  { role: "Administrator", email: "admin@example.com", password: "Admin123!", name: "Amanuel (Admin)" },
];

const steps = [
  { title: "Sign up your account", active: true },
  { title: "Set up your workspace", active: false },
  { title: "Set up your profile", active: false },
];

export default function LMSLoginPage() {
  const router = useRouter();
  const pathname = usePathname() || "";
  const locale = pathname.split("/")[1] || "";
  const landingPath = locale ? `/${locale}` : "/";

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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
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
      if (!Array.isArray(savedUsers)) savedUsers = [];
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
    <LMSAuthShell
      landingPath={landingPath}
      sideContent={
        <>
          <div className="space-y-6">
            <div className="max-w-xl space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-[#8EB69B]">Welcome to LMS</p>
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">Get Started with Us</h1>
              <p className="max-w-xl text-sm leading-7 text-[#dcecd8]/90 sm:text-base">
                Complete these easy steps to register your account and begin your learning journey.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className={`rounded-3xl border p-5 backdrop-blur-md transition-all duration-300 ${
                    step.active
                      ? "border-white/20 bg-white/15 shadow-[0_22px_70px_rgba(0,0,0,0.25)]"
                      : "border-white/10 bg-white/10 hover:border-white/20 hover:bg-white/15"
                  }`}
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-sm font-semibold text-[#DAF1DE] ring-1 ring-white/10">
                    {index + 1}
                  </span>
                  <p className="mt-4 text-sm font-semibold text-white">{step.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8EB69B]">Premium access</p>
            <p className="mt-3 text-sm leading-6 text-[#dcecd8]">
              Securely sign in to continue with your courses, certificates, and dashboard content.
            </p>
          </div>
        </>
      }
    >
      <div className="mb-8 space-y-3 text-center sm:text-left">
        <p className="text-sm uppercase tracking-[0.35em] text-[#8EB69B]">Welcome back</p>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Sign In</h1>
        <p className="text-sm leading-6 text-[#c7e4d5]">
          Access your learning dashboard with your registered account.
        </p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-3xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white transition hover:border-[#8EB69B] hover:bg-white/15"
          onClick={() => alert('Google login placeholder')}
        >
          <span className="text-base">G</span>
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-3xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white transition hover:border-[#8EB69B] hover:bg-white/15"
          onClick={() => alert('GitHub login placeholder')}
        >
          <span className="text-base">GH</span>
          GitHub
        </button>
      </div>

      <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#8EB69B]">
        <span className="h-px flex-1 bg-white/10" />
        Or login with email
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        {['Student', 'Teacher', 'Administrator'].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setRole(item)}
            className={`rounded-3xl px-3 py-2 text-sm font-semibold transition-all ${
              role === item
                ? 'bg-[#8EB69B]/15 text-[#DAF1DE] ring-1 ring-[#8EB69B]/40'
                : 'bg-white/5 text-[#c7e4d5] hover:bg-white/10'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-[#dae9dc]">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@example.com"
            className="w-full rounded-3xl border border-white/15 bg-[#163832]/80 px-4 py-3 text-white outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/30"
            required
          />
        </div>

        <div className="relative space-y-2">
          <label htmlFor="password" className="text-sm font-semibold text-[#dae9dc]">Password</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password123!"
            className="w-full rounded-3xl border border-white/15 bg-[#163832]/80 px-4 py-3 text-white outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/30"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-11 text-sm text-[#8EB69B]"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {error && (
          <div className="rounded-3xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className="w-full rounded-3xl bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-3 text-sm font-bold text-[#091913] shadow-xl shadow-amber-500/25 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-5 flex flex-col gap-3 text-sm text-[#c7e4d5] sm:flex-row sm:items-center sm:justify-between">
        <Link href={`/${locale}/lms/forgot-password`} className="hover:text-white">
          Forgot password?
        </Link>
        <Link href={`/${locale}/lms/register`} className="font-semibold text-[#8EB69B] hover:text-white">
          New user? Register here
        </Link>
      </div>

      <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/5 p-4 text-sm text-[#c7e4d5]">
        <p className="font-semibold text-[#e3f5db]">Test credentials</p>
        <p className="mt-2">Student - student@example.com / Password123!</p>
        <p>Teacher - teacher@example.com / Teacher123!</p>
        <p>Administrator - admin@example.com / Admin123!</p>
      </div>
    </LMSAuthShell>
  );
}
