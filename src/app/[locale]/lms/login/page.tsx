"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import LMSAuthShell from "@/components/lms/AuthShell";

const MOCK_USERS = [
  { role: "Student", email: "student@example.com", password: "Password123!", name: "Samuel (Student)" },
  { role: "Teacher", email: "teacher@example.com", password: "Teacher123!", name: "Eleni (Teacher)" },
  { role: "Super Admin", email: "admin@example.com", password: "Admin123!", name: "Amanuel (Super Admin)" },
];

function normalizeRoleKey(role: string): "student" | "teacher" | "administrator" {
  const r = String(role || "").trim().toLowerCase();
  if (r === "super admin" || r === "super-admin" || r === "administrator") return "administrator";
  if (r === "teacher") return "teacher";
  return "student";
}

const steps = [
  { title: "Sign up your account", active: true },
  { title: "Set up your workspace", active: false },
  { title: "Set up your profile", active: false },
];

const admissionGuideSlides = [
  {
    title: "Admission Guide",
    heading: "Start With Admissions",
    text: "Review requirements, tuition, scholarships, and application steps before sign in.",
    cta: "Open Admissions",
    href: "admissions",
  },
  {
    title: "Admission Guide",
    heading: "Complete Your Registration",
    text: "Create your account after reviewing the admission criteria and required documents.",
    cta: "Register Account",
    href: "register",
  },
  {
    title: "Admission Guide",
    heading: "Then Continue to LMS",
    text: "Once admitted, sign in and continue with your courses, classes, and certificates.",
    cta: "Go to LMS Login",
    href: "login",
  },
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
  const [guideIndex, setGuideIndex] = useState(0);

  const activeGuide = admissionGuideSlides[guideIndex];

  function nextGuideSlide() {
    setGuideIndex((prev) => (prev + 1) % admissionGuideSlides.length);
  }

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

    const roleKey = normalizeRoleKey(role);

    const existing = savedUsers.find(
      (u: any) =>
        String(u?.email || "").trim().toLowerCase() === normalizedEmail &&
        String(u?.password || "").trim() === normalizedPassword &&
        normalizeRoleKey(String(u?.role || "")) === roleKey,
    );

    const currentMock = MOCK_USERS.find(
      (u) =>
        normalizeRoleKey(u.role) === roleKey &&
        u.email.trim().toLowerCase() === normalizedEmail &&
        u.password.trim() === normalizedPassword,
    );

    const loggedInUser = existing || currentMock;

    if (loggedInUser) {
      const sessionUser = {
        ...loggedInUser,
        role: roleKey,
      };
      localStorage.setItem("lmsAuth", JSON.stringify({ token: "mock-jwt-token", user: sessionUser }));
      if (roleKey === "administrator") {
        router.push(`/${locale}/admin/dashboard-selector`);
      } else {
        router.push(`/${locale}/lms/dashboard/${roleKey}`);
      }
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
          <div className="space-y-7">
            <div className="rounded-[2rem] border border-white/25 bg-white/12 p-6 backdrop-blur-xl">
              <p className="lms-auth-kicker text-xs uppercase tracking-[0.35em]">{activeGuide.title}</p>
              <h1 className="lms-auth-title mt-2 text-3xl font-semibold sm:text-4xl">{activeGuide.heading}</h1>
              <p className="lms-auth-copy mt-3 text-sm leading-7 sm:text-base">{activeGuide.text}</p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`lms-auth-feature rounded-2xl p-4 text-center backdrop-blur-md transition-all duration-300 ${
                      guideIndex === index
                        ? "ring-1 ring-[rgba(121,185,63,0.22)]"
                        : "opacity-85"
                    }`}
                  >
                    <span className="lms-auth-feature-badge inline-flex h-9 w-9 items-center justify-center rounded-xl text-xs font-semibold">
                      {index + 1}
                    </span>
                    <p className="lms-auth-feature-title mt-2 text-[0.72rem] font-semibold leading-4">{step.title}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <Link
                  href={`/${locale}/lms/${activeGuide.href}`}
                  className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-[#0f3fbe] transition hover:bg-[#f1f6ff]"
                >
                  {activeGuide.cta}
                </Link>
                <button
                  type="button"
                  onClick={nextGuideSlide}
                  className="rounded-2xl border border-white/45 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Next
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2">
                {admissionGuideSlides.map((_, index) => (
                  <span
                    key={`dot-${index}`}
                    className={`h-2 rounded-full transition-all ${
                      guideIndex === index ? "w-6 bg-white" : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lms-auth-panel mt-10 rounded-[2rem] p-6 backdrop-blur-xl">
            <p className="lms-auth-panel-title text-sm font-semibold uppercase tracking-[0.24em]">Premium access</p>
            <p className="lms-auth-panel-copy mt-3 text-sm leading-6">
              Securely sign in to continue with your courses, certificates, and dashboard content.
            </p>
          </div>
        </>
      }
    >
      <div className="mb-8 space-y-3 text-center sm:text-left">
        <p className="lms-auth-kicker text-sm uppercase tracking-[0.35em]">Welcome back</p>
        <h1 className="lms-auth-title text-3xl font-bold sm:text-4xl">Log in to your account</h1>
        <p className="lms-auth-copy text-sm leading-6">
          Select a method to continue and access your dashboard.
        </p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="lms-auth-social flex items-center justify-center gap-2 rounded-3xl px-4 py-3 text-sm transition"
          onClick={() => alert('Google login placeholder')}
        >
          <span className="text-base">G</span>
          Google
        </button>
        <button
          type="button"
          className="lms-auth-social flex items-center justify-center gap-2 rounded-3xl px-4 py-3 text-sm transition"
          onClick={() => alert('Facebook login placeholder')}
        >
          <span className="text-base">f</span>
          Facebook
        </button>
      </div>

      <div className="lms-auth-divider mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.25em]">
        <span className="lms-auth-divider-line h-px flex-1" />
        Or login with email
        <span className="lms-auth-divider-line h-px flex-1" />
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        {["Student", "Teacher", "Super Admin"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setRole(item)}
            className={`rounded-3xl px-3 py-2 text-sm font-semibold transition-all ${
              role === item
                ? 'pill-lime pill-lime-active ring-1 ring-brightYellow/25'
                : 'lms-auth-role'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="lms-auth-label text-sm font-semibold">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@example.com"
            className="input-lime px-4 py-3"
            required
          />
        </div>

        <div className="relative space-y-2">
          <label htmlFor="password" className="lms-auth-label text-sm font-semibold">Password</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password123!"
            className="input-lime px-4 py-3"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="lms-auth-toggle absolute right-4 top-11 text-sm"
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
          className="w-full rounded-3xl gradient-primary px-4 py-3 text-sm font-bold text-[var(--charcoal)] shadow-xl shadow-[var(--color-accent-bright)]/15 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="lms-auth-muted mt-5 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <Link href={`/${locale}/lms/forgot-password`} className="lms-auth-link">
          Forgot password?
        </Link>
        <Link href={`/${locale}/lms/register`} className="lms-auth-link font-semibold">
          New user? Register here
        </Link>
      </div>

      <div className="lms-auth-note mt-8 rounded-[1.75rem] p-4 text-sm">
        <p className="lms-auth-note-title font-semibold">Test credentials</p>
        <p className="mt-2">Student - student@example.com / Password123!</p>
        <p>Teacher - teacher@example.com / Teacher123!</p>
        <p>Super Admin - admin@example.com / Admin123!</p>
      </div>
    </LMSAuthShell>
  );
}
