"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle, Info } from "lucide-react";
import LMSAuthShell from "@/components/lms/AuthShell";

const feeSchedule = [
  {
    program: "Diploma Program",
    duration: "2 Years",
    applicationFee: "500 ETB (≈ $4 USD — same for all programs)",
    tuition: "2,800 ETB / semester",
    courseBreakdown: "500 ETB per course",
    delivery: ["In-Person", "Online"],
    totalEstimate: "~13,200 ETB",
  },
  {
    program: "Short Courses",
    duration: "Flexible",
    applicationFee: "500 ETB (≈ $4 USD — same for all programs)",
    tuition: "500 ETB per course",
    courseBreakdown: null,
    delivery: ["In-Person", "Online"],
    totalEstimate: "Varies",
  },
];

const paymentInfo = [
  "Application fees are non-refundable once the application is submitted.",
  "Tuition can be paid in full at the start of each semester or in two equal installments.",
  "A 5% discount applies to full upfront payment for the entire academic year.",
  "Late payment (beyond 30 days after due date) incurs a 10% surcharge.",
  "Students facing financial hardship may apply for a payment deferral — contact the finance office.",
  "All fees are subject to annual review and may change; enrolled students are notified 60 days in advance.",
];

const paymentMethods = [
  { method: "Bank Transfer", detail: "Commercial Bank of Ethiopia — Account: 1000-XXXX-XXXX (Hamere Wengel)" },
  { method: "In-Person", detail: "Finance Office, Main Campus — Monday to Friday, 8:00 AM – 5:00 PM" },
  { method: "Mobile Money", detail: "CBE Birr / Telebirr — Phone: +251 XX XXX XXXX" },
];

export default function TuitionFeesClient() {
  const pathname = usePathname() || "";
  const locale = pathname.split("/")[1] || "en";
  const base = `/${locale}`;

  const sideContent = (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#d6ff00] text-[#0f1e13] text-2xl font-bold mb-6 shadow-[0_10px_30px_rgba(214,255,0,.25)]">
          💳
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-black mb-2">Admissions</p>
        <h2 className="font-serif text-3xl font-bold text-black leading-tight mb-4">Tuition & Fees</h2>
        <p className="text-black text-sm leading-relaxed">
          We are committed to making theological education accessible. Our fees are structured
          to reflect the quality of education while remaining affordable.
        </p>
      </div>
      <div className="space-y-2">
        <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-black">
          💰 Installment payment plans available
        </div>
        <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-black">
          🎓 Scholarships available — see next page
        </div>
        <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-black">
          📞 Finance office open Mon–Fri, 8AM–5PM
        </div>
      </div>
    </div>
  );

  return (
    <LMSAuthShell landingPath={base} sideContent={sideContent}>
      <div className="space-y-7">
        {/* Back + Header */}
        <div>
          <Link
            href={`${base}/lms/admissions`}
            className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#2e7d52] hover:underline"
          >
            <ArrowLeft size={13} /> Back to Admissions
          </Link>
          <p className="text-xs uppercase tracking-[0.25em] text-[#2e7d52] font-semibold mb-1">
            Step 3 of 4
          </p>
          <h1 className="font-serif text-3xl font-bold text-[var(--charcoal)] leading-tight">
            Tuition & Fees
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
            Amounts in Ethiopian Birr (ETB). USD equivalents shown for reference. Fees apply per program unless noted.
          </p>
        </div>

        {/* Fee Schedule */}
        <div className="space-y-4">
          {feeSchedule.map((prog) => (
            <div
              key={prog.program}
              className="rounded-2xl border border-[var(--charcoal)]/10 bg-white/55 p-5 backdrop-blur-sm"
            >
              <div className="mb-3 flex items-center justify-between gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-[var(--charcoal)]">{prog.program}</h3>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="rounded-full bg-[#d6ff00]/70 px-2 py-0.5 text-[0.6rem] font-semibold text-[#0f1e13]">
                    {prog.duration}
                  </span>
                  {prog.delivery.map((mode) => (
                    <span key={mode} className="rounded-full bg-[#2e7d52]/15 px-2 py-0.5 text-[0.6rem] font-semibold text-[#2e7d52]">
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between gap-4">
                  <p className="text-[var(--muted)] uppercase tracking-wider text-[0.6rem]">Application Fee</p>
                  <p className="font-semibold text-[var(--charcoal)] text-right">{prog.applicationFee}</p>
                </div>
                <div className="flex justify-between gap-4">
                  <p className="text-[var(--muted)] uppercase tracking-wider text-[0.6rem]">Tuition</p>
                  <p className="font-semibold text-[var(--charcoal)] text-right">{prog.tuition}</p>
                </div>
                {prog.courseBreakdown && (
                  <div className="flex justify-between gap-4">
                    <p className="text-[var(--muted)] uppercase tracking-wider text-[0.6rem]">Per Course</p>
                    <p className="font-semibold text-[var(--charcoal)] text-right">{prog.courseBreakdown}</p>
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#2e7d52]/10 px-3 py-2">
                <span className="text-[0.65rem] uppercase tracking-wider text-[#2e7d52] font-semibold">Total Estimate:</span>
                <span className="text-sm font-bold text-[#2e7d52]">{prog.totalEstimate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Policy */}
        <div className="rounded-2xl border border-[var(--charcoal)]/10 bg-white/50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Info size={14} className="text-[#2e7d52]" />
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--charcoal)]">Payment Policy</h3>
          </div>
          <ul className="space-y-1.5">
            {paymentInfo.map((p) => (
              <li key={p} className="flex items-start gap-2 text-xs text-[var(--charcoal)]/80 leading-relaxed">
                <CheckCircle size={11} className="mt-0.5 flex-shrink-0 text-[#2e7d52]" /> {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Methods */}
        <div className="rounded-2xl border border-[var(--charcoal)]/10 bg-white/50 p-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--charcoal)]">Payment Methods</h3>
          <div className="space-y-2">
            {paymentMethods.map((m) => (
              <div key={m.method} className="flex items-start gap-3">
                <span className="mt-0.5 inline-block rounded-lg bg-[#2e7d52]/12 px-2 py-1 text-[0.65rem] font-bold text-[#2e7d52] flex-shrink-0">
                  {m.method}
                </span>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3 pt-1">
          <Link
            href={`${base}/lms/admissions/scholarships`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2e7d52] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(46,125,82,0.35)] transition-all hover:bg-[#245f41] active:scale-[0.98]"
          >
            Next: Scholarships <ArrowRight size={16} />
          </Link>
          <Link
            href={`${base}/lms/admissions/how-to-apply`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--charcoal)]/15 bg-white/60 px-6 py-3.5 text-sm font-semibold text-[var(--charcoal)] transition-all hover:border-[#2e7d52]/40 hover:bg-white/80"
          >
            <ArrowLeft size={15} /> Back: How to Apply
          </Link>
        </div>
      </div>
    </LMSAuthShell>
  );
}
