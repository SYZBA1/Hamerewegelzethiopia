"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useInView,
} from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Scale,
  GraduationCap,
  ChevronUp,
  ArrowRight,
  BookOpen,
  Users,
  Globe,
  Layers,
} from "lucide-react";
import clsx from "clsx";

// ── Types ────────────────────────────────────────────────────
interface Stat    { val: string; label: string }
interface Pillar  { title: string; desc: string }
interface Content {
  historyTag: string; historyTitle: string;
  historyP1: string;  historyP2: string;  historyP3: string;
  statsTitle: string; stats: Stat[];
  pillarsTitle: string; pillars: Pillar[];
  mapTitle: string; mapSub: string;
  ctaTitle: string; ctaApply: string; ctaSupport: string;
  lmsLabel: string;
}

interface AboutPageClientProps {
  locale: string;
  content: Content;
}

// ── Reveal wrapper ────────────────────────────────────────────
function RevealSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 30 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Stat counter ──────────────────────────────────────────────
function StatCounter({ val, label, delay }: Stat & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif text-[2.8rem] font-semibold text-gold leading-none mb-2"
      >
        {val}
      </motion.div>
      <div className="text-[0.65rem] uppercase tracking-[0.2em] text-mist/50 font-sans">
        {label}
      </div>
    </motion.div>
  );
}

// ── Pillar icons ──────────────────────────────────────────────
const pillarIcons = [ShieldCheck, Cpu, Scale, GraduationCap];

// ── Map dots (decorative SVG) ──────────────────────────────────
const mapDots = [
  { cx: 52, cy: 42, r: 6, label: "Addis Ababa (HQ)", pulse: true },
  { cx: 44, cy: 32, r: 3.5, label: "Tigray" },
  { cx: 58, cy: 35, r: 3.5, label: "Harar" },
  { cx: 46, cy: 50, r: 3.5, label: "Hawassa" },
  { cx: 38, cy: 44, r: 3, label: "Jimma" },
  { cx: 62, cy: 28, r: 2.5, label: "Dire Dawa" },
  { cx: 30, cy: 30, r: 2.5, label: "Bahir Dar" },
  // Diaspora
  { cx: 24, cy: 20, r: 2, label: "Europe" },
  { cx: 18, cy: 35, r: 2, label: "North America" },
  { cx: 75, cy: 48, r: 2, label: "Middle East" },
  { cx: 80, cy: 62, r: 2, label: "Asia" },
];

// ── Main component ────────────────────────────────────────────
export default function AboutPageClient({ locale, content }: AboutPageClientProps) {
  const isAm = locale === "am";
  const [showTop, setShowTop] = useState(false);

  // Scroll progress bar (right side)
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Back-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prefix = locale === "en" ? "/en" : "/am";
  const href = (p: string) => `${prefix}${p}`;

  const textClass = clsx(
    isAm ? "font-ethiopic" : "font-sans"
  );

  return (
    <main className={clsx("pt-20 min-h-screen", textClass)}>

      {/* ── Right-side vertical scroll progress ── */}
      <motion.div
        className="fixed top-0 right-0 bottom-0 w-[3px] bg-gold/70 origin-top z-40 pointer-events-none"
        style={{ scaleY }}
      />

      {/* ══════════════════════════════════════════════════
          SECTION 1 — History  (50/50 split, image left)
      ══════════════════════════════════════════════════ */}
      <section className="flex flex-col lg:flex-row min-h-[90vh]">

        {/* Image panel */}
        <div className="w-full lg:w-1/2 relative overflow-hidden min-h-[55vw] lg:min-h-0">
          {/* Placeholder — swap src="/cathedral.jpg" when available */}
          <motion.div
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #051F20 0%, #0B2B26 35%, #163832 65%, #235347 100%)" }}
          >
            {/* Cathedral placeholder with decorative rings */}
            <div className="relative flex items-center justify-center w-full h-full">
              {[200, 150, 100].map((s, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-sage/10 animate-pulse"
                  style={{ width: s, height: s, animationDelay: `${i * 0.5}s` }}
                />
              ))}
              <span className="text-[6rem] opacity-15 select-none">⛪</span>
            </div>
          </motion.div>

          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-deep/30 lg:to-deep/60" />

          {/* Gold accent strip */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </div>

        {/* Text panel */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-10 lg:px-16 xl:px-24 py-20">
          <RevealSection delay={0.1}>
            <span
              className={clsx(
                "inline-flex items-center gap-3 font-semibold mb-6",
                "text-forest underline decoration-gold underline-offset-[6px]",
                isAm
                  ? "font-ethiopic text-[0.8rem]"
                  : "font-sans text-[0.65rem] uppercase tracking-[0.28em]"
              )}
            >
              <span className="block w-6 h-[2px] bg-gold rounded-full no-underline" />
              {content.historyTag}
            </span>
          </RevealSection>

          <RevealSection delay={0.2}>
            <h1
              className={clsx(
                "font-serif font-semibold text-deep mb-8 leading-[1.12]",
                "text-[clamp(2rem,4.5vw,3.2rem)]",
                isAm && "font-ethiopic leading-[1.4]"
              )}
            >
              {content.historyTitle}
            </h1>
          </RevealSection>

          <div className="space-y-5">
            {[content.historyP1, content.historyP2, content.historyP3].map((p, i) => (
              <RevealSection key={i} delay={0.3 + i * 0.12}>
                <p
                  className={clsx(
                    "leading-[1.9] text-deep/68",
                    isAm ? "font-ethiopic text-[0.9rem]" : "font-sans text-[0.96rem]",
                    i === 0 && "text-[1.02rem] text-deep/78 font-medium"
                  )}
                >
                  {p}
                </p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — Impact Stats  (dark bg, counters)
      ══════════════════════════════════════════════════ */}
      <section
        className="py-24 px-6"
        style={{ background: "linear-gradient(180deg, #051F20 0%, #0B2B26 100%)" }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className={clsx(
              "text-gold/75 mb-3",
              isAm ? "font-ethiopic text-[0.8rem]" : "font-sans text-[0.65rem] uppercase tracking-[0.28em]"
            )}>
              {content.statsTitle}
            </p>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {content.stats.map((s, i) => (
              <StatCounter key={i} val={s.val} label={s.label} delay={i * 0.1} />
            ))}
          </div>

          {/* Decorative bottom border */}
          <div className="mt-16 h-px bg-gradient-to-r from-transparent via-sage/20 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 3 — Four Pillars  (light mint bg)
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: "#ffffff" }}>
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-16">
            <h2
              className={clsx(
                "font-serif font-semibold text-deep",
                "text-[clamp(1.8rem,3.5vw,2.8rem)]",
                isAm && "font-ethiopic"
              )}
            >
              {content.pillarsTitle}
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-forest to-transparent mx-auto mt-5 rounded-full" />
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.pillars.map((pillar, i) => {
              const Icon = pillarIcons[i];
              return (
                <RevealSection key={i} delay={i * 0.1} direction="up">
                  <div
                    className="group h-full p-8 rounded-2xl border border-transparent
                      hover:border-forest/40 hover:shadow-[0_8px_40px_rgba(35,83,71,.12)]
                      transition-all duration-350 cursor-default"
                    style={{ background: "#E8F5E9" }}
                  >
                    {/* Icon */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5
                        bg-forest/10 group-hover:bg-forest/20 transition-colors duration-300"
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.6}
                        className="text-forest group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className={clsx(
                        "font-serif font-semibold text-deep text-[1.15rem] mb-3 leading-tight",
                        isAm && "font-ethiopic text-[1rem]"
                      )}
                    >
                      {pillar.title}
                    </h3>

                    {/* Divider */}
                    <div className="w-8 h-[1.5px] bg-gold/50 rounded-full mb-4" />

                    {/* Description */}
                    <p
                      className={clsx(
                        "text-deep/62 leading-relaxed",
                        isAm ? "font-ethiopic text-[0.82rem]" : "font-sans text-[0.84rem]"
                      )}
                    >
                      {pillar.desc}
                    </p>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 4 — Global Map  (mint bg, SVG world)
      ══════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-28 px-6"
        style={{ background: "#E8F5E9" }}
      >
        {/* Decorative background pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #235347 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <RevealSection className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-forest mb-4">
              <Globe size={16} strokeWidth={1.6} />
              <span className={clsx(
                isAm ? "font-ethiopic text-[0.8rem]" : "font-sans text-[0.65rem] uppercase tracking-[0.28em]"
              )}>
                {content.mapTitle}
              </span>
            </div>
            <p
              className={clsx(
                "max-w-xl mx-auto text-deep/60 leading-relaxed",
                isAm ? "font-ethiopic text-[0.88rem]" : "font-sans text-[0.92rem]"
              )}
            >
              {content.mapSub}
            </p>
          </RevealSection>

          {/* SVG Map */}
          <RevealSection delay={0.15}>
            <div
              className="relative rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(35,83,71,.15)]"
              style={{
                background: "linear-gradient(135deg, #163832 0%, #0B2B26 40%, #051F20 100%)",
                minHeight: 340,
              }}
            >
              <svg
                viewBox="0 0 100 70"
                className="w-full"
                aria-label="Ministry global network map"
              >
                {/* Continent silhouettes (simplified) */}
                <path d="M22 25 Q28 18 35 22 Q40 28 38 35 Q32 40 25 38 Q18 32 22 25Z" fill="rgba(142,182,155,0.08)" />
                <path d="M42 18 Q55 14 65 20 Q70 30 66 42 Q58 52 50 50 Q42 45 40 35 Q38 25 42 18Z" fill="rgba(142,182,155,0.08)" />
                <path d="M68 22 Q76 20 80 28 Q78 36 72 35 Q66 30 68 22Z" fill="rgba(142,182,155,0.07)" />
                <path d="M15 32 Q20 28 22 34 Q20 40 15 38Z" fill="rgba(142,182,155,0.06)" />
                <path d="M76 42 Q84 40 86 50 Q82 58 76 55 Q72 48 76 42Z" fill="rgba(142,182,155,0.06)" />

                {/* Connection lines from HQ */}
                {mapDots.filter(d => !d.pulse).map((d, i) => (
                  <line
                    key={i}
                    x1="52" y1="42"
                    x2={d.cx} y2={d.cy}
                    stroke="rgba(201,169,110,0.15)"
                    strokeWidth="0.3"
                    strokeDasharray="1 1"
                  />
                ))}

                {/* Dots */}
                {mapDots.map((dot, i) => (
                  <g key={i}>
                    {dot.pulse && (
                      <>
                        <circle cx={dot.cx} cy={dot.cy} r={dot.r * 2.5} fill="rgba(201,169,110,0.08)" />
                        <circle cx={dot.cx} cy={dot.cy} r={dot.r * 1.6} fill="rgba(201,169,110,0.15)" />
                      </>
                    )}
                    <circle
                      cx={dot.cx}
                      cy={dot.cy}
                      r={dot.r}
                      fill={dot.pulse ? "#C9A96E" : "#8EB69B"}
                      opacity={dot.pulse ? 0.9 : 0.65}
                    />
                    {dot.pulse && (
                      <circle cx={dot.cx} cy={dot.cy} r={dot.r * 0.5} fill="#ffffff" opacity={0.6} />
                    )}
                  </g>
                ))}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 right-5 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold/90" />
                  <span className="font-sans text-[0.58rem] text-mist/50 uppercase tracking-[0.1em]">HQ</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-sage/65" />
                  <span className="font-sans text-[0.58rem] text-mist/50 uppercase tracking-[0.1em]">Branch</span>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 5 — Call to Action
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <div
              className="relative rounded-3xl p-12 lg:p-16 text-center overflow-hidden"
              style={{
                background: "#E8F5E9",
                border: "2px dashed rgba(35,83,71,0.18)",
              }}
            >
              {/* Corner decorations */}
              {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} w-5 h-5 border-forest/25 opacity-60`}
                  style={{
                    borderTop: i < 2 ? "2px solid" : "none",
                    borderBottom: i >= 2 ? "2px solid" : "none",
                    borderLeft: i % 2 === 0 ? "2px solid" : "none",
                    borderRight: i % 2 === 1 ? "2px solid" : "none",
                    borderColor: "rgba(35,83,71,0.4)",
                  }}
                />
              ))}

              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-forest/10 mb-8 mx-auto">
                <BookOpen size={22} className="text-forest" strokeWidth={1.6} />
              </div>

              <h2
                className={clsx(
                  "font-serif font-semibold text-deep mb-10 text-balance",
                  "text-[clamp(1.5rem,3vw,2.2rem)]",
                  isAm && "font-ethiopic leading-[1.5]"
                )}
              >
                {content.ctaTitle}
              </h2>

              <div className="flex flex-wrap justify-center gap-4">
                {/* Apply */}
                <Link
                  href={href("/lms")}
                  className={clsx(
                    "group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold",
                    "bg-forest text-mist shadow-[0_4px_24px_rgba(35,83,71,.35)]",
                    "hover:bg-mid hover:shadow-[0_8px_32px_rgba(35,83,71,.55)]",
                    "hover:-translate-y-0.5 transition-all duration-250",
                    isAm ? "font-ethiopic text-[0.9rem]" : "font-sans text-[0.82rem] uppercase tracking-[0.1em]"
                  )}
                >
                  {content.ctaApply}
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Support */}
                <Link
                  href={href("/donate")}
                  className={clsx(
                    "group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold",
                    "border-2 border-forest text-forest",
                    "hover:bg-forest hover:text-mist",
                    "hover:-translate-y-0.5 transition-all duration-250",
                    isAm ? "font-ethiopic text-[0.9rem]" : "font-sans text-[0.82rem] uppercase tracking-[0.1em]"
                  )}
                >
                  {content.ctaSupport}
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Back-to-top button ── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.22 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-10 right-14 z-50 w-11 h-11 rounded-full
              bg-forest/90 text-mist shadow-[0_4px_24px_rgba(0,0,0,.35)]
              backdrop-blur-md border border-sage/20
              flex items-center justify-center
              hover:bg-mid hover:shadow-[0_8px_32px_rgba(35,83,71,.5)]
              hover:-translate-y-0.5 transition-all duration-200"
            aria-label="Back to top"
          >
            <ChevronUp size={18} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}

