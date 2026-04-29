import Link from "next/link";
import type { Locale } from "@/context/LanguageContext";

type AboutTeaserProps = {
  locale: Locale;
};

const content = {
  en: {
    eyebrow: "About Hamere Wengel",
    title: "An organization story rooted in faith, service, and lasting community impact.",
    body:
      "Hamere Wengel began with a clear vision to serve communities through practical faith in action. Over time, the ministry has grown into a connected movement for discipleship, outreach, and compassionate support.",
    bodyTwo:
      "Today, we continue equipping families, youth, and leaders through structured programs, spiritual formation, and real community engagement. What makes us unique is our ability to combine spiritual depth with measurable, everyday service.",
    cta: "Read Our Story",
    cardTitle: "Core Message",
    cardPoints: ["Faith that leads to real action", "Learning pathways that build leaders", "Compassionate service for lasting transformation"],
  },
  am: {
    eyebrow: "ስለ ሐመረ ወንጌል",
    title: "በእምነት፣ በሥልጠና እና በአገልግሎት ላይ የተመሠረተ እውነተኛ የአገልግሎት ታሪክ።",
    body:
      "ሐመረ ወንጌል መንፈሳዊ ቅርስን በመጠበቅ ላይ ብቻ ሳይቆም አዲስ ትውልድን በትምህርት፣ በአመራር ማበልጸግ፣ በርህራሄ አገልግሎት እና በማህበረሰብ እንክብካቤ ለማበቃት ይሰራል።",
    bodyTwo:
      "ይህ አገልግሎት ባህላዊ ዋጋዎችን ከተግባራዊ እርምጃ ጋር በማጣመር ቤተሰቦች፣ ተማሪዎች እና መሪዎች በእምነት እንዲያድጉ ያግዛል።",
    cta: "ታሪካችንን ያንብቡ",
    cardTitle: "ሰዎች ለምን ይቀጥላሉ",
    cardPoints: ["የተመሠረተ መንፈሳዊ ትምህርት", "በማህበረሰብ ውስጥ የሚታይ ተፅእኖ", "ለረጅም ጊዜ እድገት የተገነቡ ፕሮግራሞች"],
  },
} as const;

export default function AboutTeaser({ locale }: AboutTeaserProps) {
  const normalizedLocale: Locale = locale === "am" ? "am" : "en";
  const base = `/${normalizedLocale}`;
  const copy = content[normalizedLocale];
  const isAmharic = normalizedLocale === "am";

  return (
    <section className="bg-[#cedf93] px-4 py-14 sm:px-6 sm:py-18 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="rounded-[28px] border border-[#121a11]/10 bg-[#f7f8ef] p-6 shadow-[0_14px_34px_rgba(23,35,18,0.08)] sm:p-8 lg:p-10">
          <p className={`text-[#000000] text-xs ${isAmharic ? "font-ethiopic" : "font-sans uppercase tracking-[0.2em]"}`}>
            {copy.eyebrow}
          </p>
          <h2 className={`mt-4 text-3xl text-[#121a11] sm:text-4xl lg:text-[3.2rem] ${isAmharic ? "font-ethiopic leading-[1.34]" : "font-serif font-semibold leading-[1.1]"}`}>
            {normalizedLocale === "am" ? "የማህበረሰብ እድገትን በግልፅ አቅጣጫ እና በተግባር እንገነባለን" : "We help communities make smarter decisions and grow with clarity."}
          </h2>
          <p className={`mt-6 max-w-3xl text-sm leading-7 text-[#121a11]/68 ${isAmharic ? "font-ethiopic" : "font-sans"}`}>
            {copy.body}
          </p>
          <p className={`mt-3 max-w-3xl text-sm leading-7 text-[#121a11]/68 ${isAmharic ? "font-ethiopic" : "font-sans"}`}>
            {copy.bodyTwo}
          </p>
          <div className="mt-8">
            <Link
              href={`${base}/about`}
              className={`inline-flex items-center justify-center rounded-full bg-[#121a11] px-6 py-3 text-xs text-[#f7f7f7] transition-all duration-300 hover:-translate-y-0.5 ${
                isAmharic ? "font-ethiopic text-base" : "font-sans uppercase tracking-[0.12em]"
              }`}
            >
              {copy.cta}
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-[#121a11]/12 bg-[#121a11] p-5 text-[#f7f7f7] shadow-[0_20px_36px_rgba(18,26,17,0.28)] sm:p-6">
          <div className="flex items-center justify-between border-b border-white/12 pb-4">
            <p className={`text-[#d6ff00] ${isAmharic ? "font-ethiopic" : "font-sans uppercase tracking-[0.14em]"}`}>
              {normalizedLocale === "am" ? "አፈጻጸም" : "Performance"}
            </p>
            <span className="rounded-full bg-[#d6ff00] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#121a11]">Live</span>
          </div>

          <div className="mt-5 rounded-2xl border border-white/12 bg-white/[0.04] p-4">
            <p className="font-serif text-4xl font-semibold text-[#d6ff00]">49%</p>
            <p className={`mt-1 text-xs text-[#f7f7f7] ${isAmharic ? "font-ethiopic" : "font-sans uppercase tracking-[0.14em]"}`}>
              {normalizedLocale === "am" ? "የተለካ የእድገት አቅጣጫ" : "Measured growth trend"}
            </p>
          </div>

          <p className={`mt-5 text-sm text-[#d6ff00] ${isAmharic ? "font-ethiopic" : "font-sans"}`}>{copy.cardTitle}</p>
          <ul className="mt-3 space-y-2 text-[#f7f7f7]">
            {copy.cardPoints.map((point) => (
              <li key={point} className={`rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 ${isAmharic ? "font-ethiopic text-sm" : "font-sans text-white"}`}>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}