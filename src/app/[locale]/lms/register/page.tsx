"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import LMSAuthShell from "@/components/lms/AuthShell";

const steps = [
  { title: "Sign up your account", active: true },
  { title: "Set up your workspace" },
  { title: "Set up your profile" },
];

export default function LMSRegisterPage() {
  const router = useRouter();
  const pathname = usePathname() || "";
  const locale = pathname.split("/")[1] || "";
  const landingPath = locale ? `/${locale}` : "/";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    email.trim().length > 0 &&
    password.trim().length > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!canSubmit) {
      setError("Please complete all registration fields.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem("lmsUsers") || "[]");
    const exists = users.find((u: any) => String(u?.email || "").trim().toLowerCase() === normalizedEmail);

    if (exists) {
      setError("This email is already registered. Please login.");
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    const newUser = {
      name: fullName,
      role,
      email: normalizedEmail,
      password: password.trim(),
    };

    localStorage.setItem("lmsUsers", JSON.stringify([...users, newUser]));
    setLoading(true);
    setMessage("Account created! You will be redirected shortly.");

    setTimeout(() => {
      localStorage.setItem("lmsAuth", JSON.stringify({ token: "mock-jwt-token", user: newUser }));
      router.push(`/${locale}/lms/dashboard/${role.toLowerCase()}`);
    }, 1100);
  }

  return (
    <LMSAuthShell
      landingPath={landingPath}
      sideContent={
        <>
          <div className="space-y-6">
            <div className="max-w-xl space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-[#8EB69B]">New account</p>
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">Get Started with Us</h1>
              <p className="max-w-xl text-sm leading-7 text-[#dcecd8]/90 sm:text-base">
                Complete these easy steps to register your account and start learning with our LMS.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/15"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-sm font-semibold text-[#DAF1DE] ring-1 ring-white/15">
                    {index + 1}
                  </span>
                  <p className="mt-4 text-sm font-semibold text-white">{step.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8EB69B]">Registration flow</p>
            <p className="mt-3 text-sm leading-6 text-[#dcecd8]">
              Your details are securely stored in the LMS, and payment instructions will be sent to your email after sign up.
            </p>
          </div>
        </>
      }
    >
      <div className="mb-8 space-y-3 text-center sm:text-left">
        <p className="text-sm uppercase tracking-[0.35em] text-[#8EB69B]">Create account</p>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Sign Up Account</h1>
        <p className="text-sm leading-6 text-[#c7e4d5]">
          Enter your personal data to create your account.
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
        Or continue with form
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-semibold text-[#dae9dc]">First Name</label>
            <input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className="w-full rounded-3xl border border-white/15 bg-[#163832]/80 px-4 py-3 text-white outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/30"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-semibold text-[#dae9dc]">Last Name</label>
            <input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Francisco"
              className="w-full rounded-3xl border border-white/15 bg-[#163832]/80 px-4 py-3 text-white outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/30"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-[#dae9dc]">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@gmail.com"
            className="w-full rounded-3xl border border-white/15 bg-[#163832]/80 px-4 py-3 text-white outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/30"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold text-[#dae9dc]">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full rounded-3xl border border-white/15 bg-[#163832]/80 px-4 py-3 text-white outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/30"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-3 text-sm text-[#8EB69B]"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-semibold text-[#dae9dc]">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-3xl border border-white/15 bg-[#163832]/80 px-4 py-3 text-white outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/30"
          >
            <option>Student</option>
            <option>Teacher</option>
            <option>Administrator</option>
          </select>
        </div>

        {error && (
          <div className="rounded-3xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}
        {message && (
          <div className="rounded-3xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className="w-full rounded-3xl bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-3 text-sm font-bold text-[#091913] shadow-xl shadow-amber-500/25 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Finishing...' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#c7e4d5]">
        Already have an account?{' '}
        <Link href={`/${locale}/lms/login`} className="font-semibold text-[#8EB69B] hover:text-white">
          Log in
        </Link>
      </p>
    </LMSAuthShell>
  );
}
