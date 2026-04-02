"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LMSRegisterPage() {
  const router = useRouter();
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

    setMessage("Account created! Redirecting to login...");
    setTimeout(() => {
      router.push("/lms/login");
    }, 1200);
  }

  return (
    <main className="mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-amber-400/30 bg-slate-900/80 p-8 shadow-xl backdrop-blur">
        <h1 className="mb-3 text-center text-3xl font-semibold text-amber-300">LMS Register</h1>
        <p className="mb-4 text-center text-sm text-slate-300">Create your student account and access the LMS.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-200">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
              placeholder="Samuel"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-200">Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
            >
              <option>Student</option>
              <option>Teacher</option>
              <option>Administrator</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-200">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
              placeholder="you@gmail.com"
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
              placeholder="At least 8 characters"
              required
            />
          </label>

          {error && <p className="text-sm text-rose-300">{error}</p>}
          {message && <p className="text-sm text-emerald-300">{message}</p>}

          <button className="w-full rounded-lg bg-amber-500 px-4 py-2 font-semibold text-[#091913] hover:bg-amber-400" type="submit">
            Register & Go to Dashboard
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-300">
          Already have account?{' '}
          <Link href="/lms/login" className="text-amber-200 hover:text-amber-100">
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}
