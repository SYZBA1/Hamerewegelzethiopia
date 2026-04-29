"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import LMSAuthShell from "@/components/lms/AuthShell";

type DegreeType = "diploma" | "degree" | "masters" | "courses";

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
  const [degreeType, setDegreeType] = useState<DegreeType>("diploma");
  const [diplomaSchool, setDiplomaSchool] = useState("");
  const [diplomaYear, setDiplomaYear] = useState("");
  const [degreeMajor, setDegreeMajor] = useState("");
  const [degreeEntry, setDegreeEntry] = useState("");
  const [mastersField, setMastersField] = useState("");
  const [mastersInstitution, setMastersInstitution] = useState("");
  const [courseTrack, setCourseTrack] = useState("");
  const [courseIntake, setCourseIntake] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const baseOk = useMemo(
    () =>
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length >= 8,
    [firstName, lastName, email, password],
  );

  function validateProgramFields(): string | null {
    if (degreeType === "diploma") {
      if (!diplomaSchool.trim()) return "Enter your school or previous institution for the diploma track.";
      if (!/^\d{4}$/.test(diplomaYear.trim())) return "Enter a valid graduation year (YYYY) for the diploma track.";
    }
    if (degreeType === "degree") {
      if (!degreeMajor.trim()) return "Enter your intended major / field of study.";
      if (!degreeEntry.trim()) return "Enter your entry level or year (e.g. Year 1).";
    }
    if (degreeType === "masters") {
      if (!mastersField.trim()) return "Enter your prior degree field.";
      if (!mastersInstitution.trim()) return "Enter the institution that awarded your prior degree.";
    }
    if (degreeType === "courses") {
      if (!courseTrack.trim()) return "Specify the course or track you are enrolling in.";
      if (!courseIntake.trim()) return "Choose or describe your preferred intake / session.";
    }
    return null;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!baseOk) {
      setError("Please complete all required fields. Password must be at least 8 characters.");
      return;
    }

    const programErr = validateProgramFields();
    if (programErr) {
      setError(programErr);
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
    const registration = {
      degreeType,
      ...(degreeType === "diploma" && {
        diplomaSchool: diplomaSchool.trim(),
        diplomaYear: diplomaYear.trim(),
      }),
      ...(degreeType === "degree" && {
        degreeMajor: degreeMajor.trim(),
        degreeEntry: degreeEntry.trim(),
      }),
      ...(degreeType === "masters" && {
        mastersField: mastersField.trim(),
        mastersInstitution: mastersInstitution.trim(),
      }),
      ...(degreeType === "courses" && {
        courseTrack: courseTrack.trim(),
        courseIntake: courseIntake.trim(),
      }),
    };

    const newUser = {
      name: fullName,
      role,
      email: normalizedEmail,
      password: password.trim(),
      registration,
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
              <p className="lms-auth-kicker text-sm uppercase tracking-[0.35em]">New account</p>
              <h1 className="lms-auth-title text-4xl font-semibold sm:text-5xl">Get Started with Us</h1>
              <p className="lms-auth-copy max-w-xl text-sm leading-7 sm:text-base">
                Complete these easy steps to register your account and start learning with our LMS.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="lms-auth-feature rounded-3xl p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="lms-auth-feature-badge inline-flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold">
                    {index + 1}
                  </span>
                  <p className="lms-auth-feature-title mt-4 text-sm font-semibold">{step.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lms-auth-panel mt-10 rounded-[2rem] p-6 backdrop-blur-xl">
            <p className="lms-auth-panel-title text-sm font-semibold uppercase tracking-[0.24em]">Registration flow</p>
            <p className="lms-auth-panel-copy mt-3 text-sm leading-6">
              Your details are securely stored in the LMS, and payment instructions will be sent to your email after sign up.
            </p>
          </div>
        </>
      }
    >
      <div className="mb-8 space-y-3 text-center sm:text-left">
        <p className="lms-auth-kicker text-sm uppercase tracking-[0.35em]">Create account</p>
        <h1 className="lms-auth-title text-3xl font-bold sm:text-4xl">Sign Up Account</h1>
        <p className="lms-auth-copy text-sm leading-6">
          Enter your personal data to create your account.
        </p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="lms-auth-social flex items-center justify-center gap-2 rounded-3xl px-4 py-3 text-sm font-medium transition"
          onClick={() => alert("Google login placeholder")}
        >
          <span className="text-base font-bold">G</span>
          Continue with Google
        </button>
        <button
          type="button"
          className="lms-auth-social flex items-center justify-center gap-2 rounded-3xl px-4 py-3 text-sm transition"
          onClick={() => alert("GitHub login placeholder")}
        >
          <span className="text-base">GH</span>
          GitHub
        </button>
      </div>

      <div className="lms-auth-divider mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.25em]">
        <span className="lms-auth-divider-line h-px flex-1" />
        Or continue with form
        <span className="lms-auth-divider-line h-px flex-1" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="firstName" className="lms-auth-label text-sm font-semibold">First Name</label>
            <input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className="input-lime px-4 py-3"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="lms-auth-label text-sm font-semibold">Last Name</label>
            <input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Francisco"
              className="input-lime px-4 py-3"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="lms-auth-label text-sm font-semibold">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@gmail.com"
            className="input-lime px-4 py-3"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="lms-auth-label text-sm font-semibold">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="input-lime px-4 py-3"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="lms-auth-toggle absolute right-4 top-3 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="degreeType" className="lms-auth-label text-sm font-semibold">Program / degree type</label>
          <select
            id="degreeType"
            value={degreeType}
            onChange={(e) => setDegreeType(e.target.value as DegreeType)}
            className="input-lime px-4 py-3"
          >
            <option value="diploma">Diploma</option>
            <option value="degree">Degree (undergraduate)</option>
            <option value="masters">Masters</option>
            <option value="courses">Short courses</option>
          </select>
        </div>

        {degreeType === "diploma" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="lms-auth-label text-sm font-semibold" htmlFor="dipSchool">School / prior institution</label>
              <input
                id="dipSchool"
                value={diplomaSchool}
                onChange={(e) => setDiplomaSchool(e.target.value)}
                className="input-lime px-4 py-3"
                placeholder="Completed secondary or equivalent"
              />
            </div>
            <div className="space-y-2">
              <label className="lms-auth-label text-sm font-semibold" htmlFor="dipYear">Graduation year</label>
              <input
                id="dipYear"
                value={diplomaYear}
                onChange={(e) => setDiplomaYear(e.target.value)}
                className="input-lime px-4 py-3"
                placeholder="YYYY"
                inputMode="numeric"
              />
            </div>
          </div>
        )}

        {degreeType === "degree" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="lms-auth-label text-sm font-semibold" htmlFor="major">Intended major / field</label>
              <input
                id="major"
                value={degreeMajor}
                onChange={(e) => setDegreeMajor(e.target.value)}
                className="input-lime px-4 py-3"
                placeholder="Theology, ministry studies..."
              />
            </div>
            <div className="space-y-2">
              <label className="lms-auth-label text-sm font-semibold" htmlFor="entry">Entry level / year</label>
              <input
                id="entry"
                value={degreeEntry}
                onChange={(e) => setDegreeEntry(e.target.value)}
                className="input-lime px-4 py-3"
                placeholder="Year 1, transfer, etc."
              />
            </div>
          </div>
        )}

        {degreeType === "masters" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="lms-auth-label text-sm font-semibold" htmlFor="msField">Prior degree field</label>
              <input
                id="msField"
                value={mastersField}
                onChange={(e) => setMastersField(e.target.value)}
                className="input-lime px-4 py-3"
                placeholder="B.A. Theology, B.Th., etc."
              />
            </div>
            <div className="space-y-2">
              <label className="lms-auth-label text-sm font-semibold" htmlFor="msInst">Awarding institution</label>
              <input
                id="msInst"
                value={mastersInstitution}
                onChange={(e) => setMastersInstitution(e.target.value)}
                className="input-lime px-4 py-3"
                placeholder="University or college name"
              />
            </div>
          </div>
        )}

        {degreeType === "courses" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="lms-auth-label text-sm font-semibold" htmlFor="track">Course / track</label>
              <input
                id="track"
                value={courseTrack}
                onChange={(e) => setCourseTrack(e.target.value)}
                className="input-lime px-4 py-3"
                placeholder="Course name or code"
              />
            </div>
            <div className="space-y-2">
              <label className="lms-auth-label text-sm font-semibold" htmlFor="intake">Preferred intake</label>
              <input
                id="intake"
                value={courseIntake}
                onChange={(e) => setCourseIntake(e.target.value)}
                className="input-lime px-4 py-3"
                placeholder="e.g. Spring 2026, Module A"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="role" className="lms-auth-label text-sm font-semibold">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input-lime px-4 py-3"
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
          disabled={!baseOk || loading}
          className="w-full rounded-3xl gradient-primary px-4 py-3 text-sm font-bold text-[var(--charcoal)] shadow-xl shadow-[var(--color-accent-bright)]/15 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Finishing..." : "Sign Up"}
        </button>
      </form>

      <p className="lms-auth-muted mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link href={`/${locale}/lms/login`} className="lms-auth-link font-semibold">
          Log in
        </Link>
      </p>
    </LMSAuthShell>
  );
}
