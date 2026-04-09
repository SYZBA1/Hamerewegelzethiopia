"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/context/LanguageContext";
import { Reveal, PageHero, SectionTitle } from "@/components/PageComponents";
import clsx from "clsx";

interface Dept  { icon: string; title: string; desc: string }
interface EduProg { title: string; duration: string; badge: string }
interface Branch { name: string; loc: string; detail: string }
interface Content {
  heroTag: string; heroTitle: string; heroSub: string;
  ministriesTitle: string; educationTitle: string; branchesTitle: string;
  ministries: Dept[]; eduProgs: EduProg[]; branches: Branch[];
  explore: string;
}

const PROG_COLORS = ["#235347", "#163832", "#0B2B26"];
const PROGRAMS = ["diploma", "degree", "masters"];
const BRANCH_ICONS = ["🏛", "⛪", "⛪", "⛪", "⛪", "✈"];

export default function DepartmentsClient({ locale, c }: { locale: string; c: Content }) {
  const isAm = locale === "am";
  const base = `/${locale}`;

  return (
    <div>
      <PageHero tag={c.heroTag} title={c.heroTitle} sub={c.heroSub} />

      {/* Ministries */}
      <section style={{ background: "#ffffff", padding: "5rem 2.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><SectionTitle>{c.ministriesTitle}</SectionTitle></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.ministries.map((m, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div
                  style={{ background: "#E8F5E9", borderRadius: 16, padding: "2rem", border: "1.5px solid transparent", transition: "all .3s", cursor: "default" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(35,83,71,.3)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 40px rgba(35,83,71,.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "transparent"; (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: "1.8rem", marginBottom: "1rem", opacity: .7 }}>{m.icon}</div>
                  <h3 className={clsx("font-serif font-semibold", isAm && "font-ethiopic")}
                    style={{ fontSize: "1.1rem", color: "#051F20", marginBottom: ".4rem" }}>{m.title}</h3>
                  <div style={{ width: "2rem", height: "1.5px", background: "#C9A96E", borderRadius: 1, margin: ".6rem 0 .9rem" }} />
                  <p className={clsx(isAm ? "font-ethiopic text-[.82rem]" : "font-sans text-[.84rem]")}
                    style={{ color: "rgba(5,31,32,.62)", lineHeight: 1.78 }}>{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education Programs */}
      <section style={{ background: "#E8F5E9", padding: "5rem 2.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><SectionTitle>{c.educationTitle}</SectionTitle></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {c.eduProgs.map((ep, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <Link href={`${base}/lms/login?program=${PROGRAMS[i]}`}>
                  <div style={{ background: PROG_COLORS[i], borderRadius: 14, padding: "2rem 1.8rem", color: "#DAF1DE", textAlign: "center", transition: "transform .3s", cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "none"}>
                    <span style={{ display: "inline-block", fontSize: ".52rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: ".18rem .55rem", borderRadius: 20, background: "rgba(142,182,155,.15)", color: "#8EB69B", border: "1px solid rgba(142,182,155,.2)", marginBottom: ".8rem" }}>
                      {ep.badge}
                    </span>
                    <h3 className={clsx("font-serif font-semibold", isAm && "font-ethiopic")}
                      style={{ fontSize: "1.1rem", marginBottom: ".4rem", lineHeight: isAm ? 1.4 : 1.15 }}>{ep.title}</h3>
                    <p className="font-sans" style={{ fontSize: ".75rem", color: "rgba(142,182,155,.7)", letterSpacing: ".06em" }}>{ep.duration}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Branches */}
      <section style={{ background: "#ffffff", padding: "5rem 2.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><SectionTitle>{c.branchesTitle}</SectionTitle></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {c.branches.map((b, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{ background: "#E8F5E9", borderRadius: 14, padding: "1.8rem", border: "1.5px solid transparent", transition: "all .3s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(35,83,71,.3)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "transparent"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                    <span style={{ fontSize: "1.8rem", opacity: .6, flexShrink: 0 }}>{BRANCH_ICONS[i] ?? "📌"}</span>
                    <div>
                      <h3 className={clsx("font-serif font-semibold", isAm && "font-ethiopic")}
                        style={{ fontSize: "1.05rem", color: "#051F20", marginBottom: ".25rem" }}>{b.name}</h3>
                      <p className={clsx(isAm ? "font-ethiopic text-[.75rem]" : "font-sans text-[.74rem]")}
                        style={{ color: "#235347", marginBottom: ".4rem" }}>📍 {b.loc}</p>
                      <p className="font-sans" style={{ fontSize: ".64rem", color: "rgba(5,31,32,.44)", letterSpacing: ".04em" }}>{b.detail}</p>
                    </div>
                  </div>
                  <div style={{ marginTop: "1.2rem", paddingTop: ".8rem", borderTop: "1px solid rgba(35,83,71,.1)" }}>
                    <Link href={`${base}/contact`}
                      className={clsx(isAm ? "font-ethiopic text-[.76rem]" : "font-sans text-[.68rem] uppercase tracking-[.1em]")}
                      style={{ color: "#235347", display: "inline-flex", alignItems: "center", gap: ".4rem", transition: "gap .2s" }}>
                      {c.explore} →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
