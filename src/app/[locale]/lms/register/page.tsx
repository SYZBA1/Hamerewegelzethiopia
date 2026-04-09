"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function LMSRegisterPage() {
  const router = useRouter();
  const pathname = usePathname() || "";
  const locale = pathname.split("/")[1] || "";

  const [name, setName] = useState("");
  const [role, setRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all registration fields.");
      return;
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    const users = JSON.parse(localStorage.getItem("lmsUsers") || "[]");
    const exists = users.find((u: any) => String(u?.email || "").trim().toLowerCase() === normalizedEmail);
    if (exists) {
      setError("This email is already registered. Please login.");
      return;
    }

    const newUser = { name: normalizedName, role, email: normalizedEmail, password: normalizedPassword };
    localStorage.setItem("lmsUsers", JSON.stringify([...users, newUser]));

    setMessage("Account created! Redirecting to your dashboard...");
    setTimeout(() => {
      localStorage.setItem("lmsAuth", JSON.stringify({ token: "mock-jwt-token", user: newUser }));
      router.push(`/${locale}/lms/dashboard/${role.toLowerCase()}`);
    }, 900);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-[#163832]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <h1 className="mb-3 text-center text-3xl font-bold text-white">LMS Register</h1>
        <p className="mb-6 text-center text-sm text-[#c0ddc8]">Create your access and join the spiritual learning community.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#dae9dc]" htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-[#163832]/70 px-3 py-2 text-white outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/40"
              placeholder="Samuel"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#dae9dc]" htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-[#163832]/70 px-3 py-2 text-white outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/40"
            >
              <option>Student</option>
              <option>Teacher</option>
              <option>Administrator</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#dae9dc]" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-[#163832]/70 px-3 py-2 text-white outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/40"
              placeholder="you@gmail.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#dae9dc]" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-[#163832]/70 px-3 py-2 text-white outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/40"
              placeholder="At least 8 characters"
              required
            />
          </div>

          {error && <p className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p>}
          {message && <p className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">{message}</p>}

          <button className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 font-bold text-[#091913] shadow-lg shadow-amber-500/30 transition hover:shadow-[0_0_20px_rgba(250,202,21,0.65)]" type="submit">
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-[#c7e2d3]">
          Already have an account?{' '}
          <Link href={`/${locale}/lms/login`} className="text-[#8EB69B] hover:text-white">
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}
