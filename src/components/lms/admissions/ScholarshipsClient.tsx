"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle, Star, AlertCircle } from "lucide-react";
import LMSAuthShell from "@/components/lms/AuthShell";

const scholarship = {
  amharic: "ሀመረ ወንጌል ከፍለው መማር ላማይችሉ በነጻ የሚማሩበትን መንገድ ያመቻቻል።",
  english: "Hamere Wengel provides a pathway for those who cannot afford to pay for their studies to learn free of charge.",
};

const applicationSteps = [
  "Complete the standard admission application form on your LMS account.",
  "On the scholarship section, select the scholarship(s) you wish to apply for.",
  "Upload all supporting documents (academic records, reference letters, income declaration).",
  "Submit a scholarship essay or statement (200–500 words) as specified per award.",
  "The scholarships committee meets within 14 days of the application deadline.",
  "Successful applicants are notified by email and via their LMS dashboard.",
];

const faq = [
  {
    q: "Can I apply for more than one scholarship?",
    a: "Yes. You may apply for multiple scholarships, but only one award will be granted per student per semester.",
  },
  {
    q: "Are scholarships renewable each year?",
    a: "Merit and service-based scholarships are renewable annually, subject to maintaining the required GPA and ministry involvement.",
  },
  {
    q: "Does a scholarship cover the application fee?",
    a: "No. The application fee must be paid before the application is reviewed. Scholarships apply only to tuition costs.",
  },
  {
    q: "What happens if I withdraw after receiving a scholarship?",
    a: "Scholarship recipients who withdraw within the first semester may be required to repay the awarded amount on a pro-rated basis.",
  },
];

export default function ScholarshipsClient() {
  const pathname = usePathname() || "";
  const locale = pathname.split("/")[1] || "en";
  const base = `/${locale}`;

  const sideContent = (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#d6ff00] text-[#0f1e13] text-2xl font-bold mb-6 shadow-[0_10px_30px_rgba(214,255,0,.25)]">
          🏅
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-black mb-2">Admissions</p>
        <h2 className="font-serif text-3xl font-bold text-black leading-tight mb-4">Scholarships</h2>
        <p className="text-black text-sm leading-relaxed">
          We believe financial constraints should never prevent a calling from being fulfilled.
          Explore our scholarships and apply alongside your admission application.
        </p>
      </div>
      <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-black">
        🤝 Contact the admissions office to apply
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
            Step 4 of 4
          </p>
          <h1 className="font-serif text-3xl font-bold text-[var(--charcoal)] leading-tight">
            Scholarships & Financial Aid
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
            Apply for one or more scholarships as part of your admission process. Awards are granted based
            on merit, service, equity, and financial need.
          </p>
        </div>

        {/* Scholarship */}
        <div className="rounded-2xl border border-[#2e7d52]/30 bg-white/55 p-6 backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2">
            <Star size={16} className="text-[#2e7d52] flex-shrink-0" />
            <span className="rounded-full bg-[#a5ff63]/70 px-2 py-0.5 text-[0.6rem] font-semibold text-[#0f1e13]">Financial Aid</span>
          </div>
          <p className="font-ethiopic text-base font-semibold text-[var(--charcoal)] leading-relaxed mb-3">
            {scholarship.amharic}
          </p>
          <p className="text-sm text-[var(--muted)] leading-relaxed italic border-t border-[var(--charcoal)]/10 pt-3">
            {scholarship.english}
          </p>
        </div>

        {/* How to Apply for Scholarship */}
        <div className="rounded-2xl border border-[var(--charcoal)]/10 bg-white/50 p-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--charcoal)]">
            How to Apply for a Scholarship
          </h3>
          <ol className="space-y-2">
            {applicationSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--charcoal)]/80 leading-relaxed">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#2e7d52]/15 text-[0.6rem] font-bold text-[#2e7d52]">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* FAQ */}
        <div className="rounded-2xl border border-[var(--charcoal)]/10 bg-white/50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <AlertCircle size={14} className="text-[#2e7d52]" />
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--charcoal)]">
              Frequently Asked Questions
            </h3>
          </div>
          <div className="space-y-3">
            {faq.map((f) => (
              <div key={f.q}>
                <p className="text-xs font-semibold text-[var(--charcoal)] mb-0.5">{f.q}</p>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="flex flex-col gap-3 pt-1">
          <Link
            href={`${base}/lms/register`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2e7d52] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(46,125,82,0.35)] transition-all hover:bg-[#245f41] active:scale-[0.98]"
          >
            Apply Now — Register Account <ArrowRight size={16} />
          </Link>
          <Link
            href={`${base}/lms/admissions/tuition-fees`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--charcoal)]/15 bg-white/60 px-6 py-3.5 text-sm font-semibold text-[var(--charcoal)] transition-all hover:border-[#2e7d52]/40 hover:bg-white/80"
          >
            <ArrowLeft size={15} /> Back: Tuition & Fees
          </Link>
        </div>

        <p className="text-center text-xs text-[var(--muted)]">
          Questions?{" "}
          <Link href={`${base}/contact`} className="font-medium text-[#2e7d52] hover:underline">
            Contact the Admissions Office
          </Link>
        </p>
      </div>
    </LMSAuthShell>
  );
}
