"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import clsx from "clsx";

// ── Scroll-triggered reveal ───────────────────────────────────
export function Reveal({
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
  const inView = useInView(ref, { once: true, amount: 0.16 });
  const init = {
    opacity: 0,
    y: direction === "up" ? 28 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={init}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : init}
      transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ── Standard dark page hero ────────────────────────────────────
export function PageHero({
  tag,
  title,
  sub,
  children,
}: {
  tag: string;
  title: string;
  sub: string;
  children?: React.ReactNode;
}) {
  const { locale } = useLang();
  const isAm = locale === "am";
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #051F20 0%, #0B2B26 40%, #163832 75%, #235347 100%)",
        padding: "7rem 2.5rem 5rem",
        borderBottom: "1px solid rgba(142,182,155,0.08)",
      }}
    >
      {/* Decorative orb */}
      <div
        className="absolute top-[-20%] right-[-5%] w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(142,182,155,.08) 0%, transparent 65%)", filter: "blur(60px)" }}
      />
      <div className="max-w-[1200px] mx-auto relative z-10">
        <Reveal>
          <p
            className={clsx(
              "flex items-center gap-3 mb-5",
              isAm ? "font-ethiopic text-[0.78rem] tracking-[0.08em]" : "font-sans text-[0.62rem] uppercase tracking-[0.28em]"
            )}
            style={{ color: "#C9A96E" }}
          >
            <span className="block w-8 h-px" style={{ background: "#C9A96E" }} />
            {tag}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1
            className={clsx(
              "font-serif font-semibold text-white mb-5",
              "text-[clamp(2rem,4.5vw,3.4rem)]",
              isAm && "font-ethiopic leading-[1.4]"
            )}
            style={{ lineHeight: 1.08 }}
          >
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            className={clsx(
              "max-w-[52ch]",
              isAm ? "font-ethiopic text-[0.88rem]" : "font-sans text-[0.96rem]"
            )}
            style={{ color: "rgba(218,241,222,.6)", lineHeight: 1.85 }}
          >
            {sub}
          </p>
        </Reveal>
        {children && <Reveal delay={0.3}>{children}</Reveal>}
      </div>
    </div>
  );
}

// ── Section title + divider ───────────────────────────────────
export function SectionTitle({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  const { locale } = useLang();
  const isAm = locale === "am";
  return (
    <div className="text-center mb-12">
      <h2
        className={clsx(
          "font-serif font-semibold",
          "text-[clamp(1.7rem,3vw,2.5rem)]",
          isAm && "font-ethiopic",
          light ? "text-white" : "text-deep"
        )}
        style={{ marginBottom: "0.5rem", lineHeight: 1.15 }}
      >
        {children}
      </h2>
      <div
        className="mx-auto mt-3 rounded-full"
        style={{
          width: "3.5rem", height: "2px",
          background: `linear-gradient(to right, ${light ? "#8EB69B" : "#235347"}, transparent)`,
        }}
      />
    </div>
  );
}

// ── Stat chip (used in several pages) ─────────────────────────
export function StatChip({ val, label, light = false }: { val: string; label: string; light?: boolean }) {
  const { locale } = useLang();
  const isAm = locale === "am";
  return (
    <div className="text-center">
      <div
        className="font-serif font-semibold"
        style={{ fontSize: "clamp(2rem,4vw,2.8rem)", color: "#C9A96E", lineHeight: 1 }}
      >
        {val}
      </div>
      <div
        className={clsx(
          isAm ? "font-ethiopic text-[0.7rem]" : "font-sans text-[0.62rem] uppercase tracking-[0.18em]",
          light ? "text-mist/45" : "text-deep/50"
        )}
        style={{ marginTop: "0.4rem" }}
      >
        {label}
      </div>
    </div>
  );
}
