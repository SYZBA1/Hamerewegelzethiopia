"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function LMSForgotPasswordPage() {
  const router = useRouter();
  const pathname = usePathname() || "";
  const locale = pathname.split("/")[1] || "";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setStatus("Check your inbox. A reset link has been sent to your email (mock).");
    setTimeout(() => router.push(`/${locale}/lms/login`), 2200);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-[#163832]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <h1 className="mb-3 text-center text-3xl font-bold text-white">Forgot Password</h1>
        <p className="mb-5 text-center text-sm text-[#c0ddc8]">Enter your email to get a reset link (mock flow).</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#dae9dc]" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-[#163832]/70 px-3 py-2 text-white outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/40"
              placeholder="you@example.com"
            />
          </div>
          {error && <p className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p>}
          {status && <p className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">{status}</p>}

          <button className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 font-bold text-[#091913] shadow-lg shadow-amber-500/30 transition hover:shadow-[0_0_20px_rgba(250,202,21,0.65)]" type="submit">
            Send Reset Link
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-[#c7e2d3]">
          Remembered your password?{' '}
          <Link href={`/${locale}/lms/login`} className="text-[#8EB69B] hover:text-white">
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}
