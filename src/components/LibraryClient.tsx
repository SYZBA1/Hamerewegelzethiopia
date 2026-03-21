"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { Reveal, PageHero, StatChip, SectionTitle } from "@/components/PageComponents";
import clsx from "clsx";

interface Stat { val: string; label: string }
interface Content {
  heroTag: string; heroTitle: string; heroSub: string;
  freeTitle: string; paidTitle: string; readerTitle: string;
  searchPlaceholder: string;
  categories: string[]; stats: Stat[];
  accessBtn: string; registerNote: string;
  previewBtn: string; downloadBtn: string; buyBtn: string; readerNote: string;
}

const FREE_RESOURCES = [
  { icon: "📜", type: "Manuscript", title: "Fetha Negest",               meta: "Ge'ez · Legal Code · 13th c.",   free: true  },
  { icon: "📖", type: "Book",       title: "Kebra Nagast",                meta: "Ge'ez · Epic · 14th c.",         free: true  },
  { icon: "🎵", type: "Audio",      title: "Deggua Chants Collection",    meta: "Amharic · 4hr 20min",            free: true  },
  { icon: "📋", type: "Journal",    title: "Ethiopian Journal of Theology",meta: "English · Vol. 12",             free: true  },
  { icon: "📜", type: "Manuscript", title: "Andemta Commentary",          meta: "Ge'ez · Commentary",             free: true  },
  { icon: "📖", type: "Book",       title: "Introduction to Ge'ez Grammar",meta: "English · 2022",               free: true  },
  { icon: "🎵", type: "Audio",      title: "Ziema Liturgical Hymns",      meta: "Ge'ez · 2hr 15min",             free: true  },
  { icon: "📋", type: "Journal",    title: "Theology & Digital Mission",   meta: "English · 2023",               free: true  },
];

const PAID_RESOURCES = [
  { icon: "📕", type: "Book",   title: "Comprehensive Ge'ez Grammar",     meta: "400 pages · PDF + Print",  price: "$4.99" },
  { icon: "📗", type: "Book",   title: "Ethiopian Church History Vol. I", meta: "320 pages · PDF",           price: "$3.99" },
  { icon: "📘", type: "Book",   title: "The Theology of Tabots",          meta: "250 pages · PDF",           price: "$4.99" },
  { icon: "📙", type: "Course", title: "Ge'ez Reading Crash Course",      meta: "12 Lessons · Audio + PDF", price: "$9.99" },
];

export default function LibraryClient({ locale, c }: { locale: string; c: Content }) {
  const isAm = locale === "am";
  const [query, setQuery]       = useState("");
  const [activeCat, setActiveCat] = useState(0);
  const [openReader, setOpenReader] = useState(false);

  return (
    <div>
      {/* Hero with search */}
      <PageHero tag={c.heroTag} title={c.heroTitle} sub={c.heroSub}>
        <div style={{ position: "relative", maxWidth: 560, marginTop: "2rem" }}>
          <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", opacity: .45, pointerEvents: "none", fontSize: "1rem" }}>🔍</span>
          <input
            type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder={c.searchPlaceholder}
            className={clsx(isAm ? "font-ethiopic text-[.86rem]" : "font-sans text-[.88rem]")}
            style={{ width: "100%", padding: ".9rem 1rem .9rem 2.8rem", background: "rgba(255,255,255,.06)", border: "1px solid rgba(142,182,155,.22)", borderRadius: 10, color: "#DAF1DE", outline: "none", transition: "border-color .2s" }}
            onFocus={e => (e.target.style.borderColor = "#8EB69B")}
            onBlur={e => (e.target.style.borderColor = "rgba(142,182,155,.22)")}
          />
        </div>
      </PageHero>

      {/* Stats band */}
      <div style={{ background: "#0B2B26", borderBottom: "1px solid rgba(142,182,155,.07)", padding: "2.5rem 2.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem" }}>
          {c.stats.map((s, i) => <StatChip key={i} val={s.val} label={s.label} light />)}
        </div>
      </div>

      {/* Category filters + free grid */}
      <section style={{ background: "#051F20", padding: "4rem 2.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <h2 className={clsx("font-serif font-semibold mb-6", isAm && "font-ethiopic")}
              style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", color: "#DAF1DE" }}>{c.freeTitle}</h2>
          </Reveal>
          {/* Filters */}
          <Reveal>
            <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: "1.8rem" }}>
              {c.categories.map((cat, i) => (
                <button key={i} onClick={() => setActiveCat(i)}
                  className={clsx(isAm ? "font-ethiopic text-[.76rem]" : "font-sans text-[.68rem] uppercase tracking-[.1em]")}
                  style={{ padding: ".38rem 1rem", borderRadius: 50, cursor: "pointer", transition: "all .2s",
                    border: `1px solid ${activeCat === i ? "#8EB69B" : "rgba(142,182,155,.2)"}`,
                    background: activeCat === i ? "rgba(142,182,155,.12)" : "transparent",
                    color: activeCat === i ? "#8EB69B" : "rgba(218,241,222,.42)" }}>
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
          {/* Free resource cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1rem" }}>
            {FREE_RESOURCES.filter(r => !query || r.title.toLowerCase().includes(query.toLowerCase())).map((r, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{ background: "rgba(11,43,38,.5)", borderRadius: 12, padding: "1.4rem", border: "1px solid rgba(142,182,155,.1)", transition: "all .25s", cursor: "pointer" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(35,83,71,.2)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(142,182,155,.28)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(11,43,38,.5)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(142,182,155,.1)"; }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".8rem" }}>
                    <span style={{ fontSize: "1.4rem", opacity: .65 }}>{r.icon}</span>
                    <span className="font-sans" style={{ fontSize: ".52rem", letterSpacing: ".08em", textTransform: "uppercase", color: "#8EB69B", background: "rgba(142,182,155,.1)", padding: ".15rem .5rem", borderRadius: 20, border: "1px solid rgba(142,182,155,.2)" }}>{r.type}</span>
                  </div>
                  <h4 className="font-serif font-semibold" style={{ fontSize: ".95rem", color: "#DAF1DE", lineHeight: 1.3, marginBottom: ".4rem" }}>{r.title}</h4>
                  <p className="font-sans text-[.65rem]" style={{ color: "rgba(218,241,222,.38)", lineHeight: 1.5, marginBottom: ".9rem" }}>{r.meta}</p>
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <button onClick={() => setOpenReader(true)}
                      className={clsx(isAm ? "font-ethiopic text-[.7rem]" : "font-sans text-[.64rem] uppercase tracking-[.08em]")}
                      style={{ flex: 1, padding: ".45rem 0", borderRadius: 7, background: "#235347", color: "#DAF1DE", border: "none", cursor: "pointer", transition: "background .2s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#163832")}
                      onMouseLeave={e => (e.currentTarget.style.background = "#235347")}>
                      {c.previewBtn}
                    </button>
                    <button className="font-sans text-[.64rem]"
                      style={{ padding: ".45rem .8rem", borderRadius: 7, background: "transparent", color: "rgba(142,182,155,.55)", border: "1px solid rgba(142,182,155,.2)", cursor: "pointer", transition: "all .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#8EB69B"; e.currentTarget.style.borderColor = "#8EB69B"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "rgba(142,182,155,.55)"; e.currentTarget.style.borderColor = "rgba(142,182,155,.2)"; }}>
                      ↓
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Paid Books */}
      <section style={{ background: "#0B2B26", padding: "4rem 2.5rem", borderTop: "1px solid rgba(142,182,155,.07)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><h2 className={clsx("font-serif font-semibold mb-8", isAm && "font-ethiopic")}
            style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", color: "#DAF1DE" }}>{c.paidTitle}</h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "1.2rem" }}>
            {PAID_RESOURCES.map((r, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ background: "rgba(5,31,32,.5)", borderRadius: 14, padding: "1.6rem", border: "1px solid rgba(142,182,155,.1)", transition: "all .3s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,169,110,.3)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(142,182,155,.1)"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}>
                  <span style={{ fontSize: "2rem", display: "block", marginBottom: ".8rem", opacity: .7 }}>{r.icon}</span>
                  <h3 className="font-serif font-semibold" style={{ fontSize: "1rem", color: "#DAF1DE", lineHeight: 1.25, marginBottom: ".4rem" }}>{r.title}</h3>
                  <p className="font-sans text-[.65rem]" style={{ color: "rgba(218,241,222,.38)", marginBottom: "1.2rem" }}>{r.meta}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="font-serif font-semibold" style={{ fontSize: "1.1rem", color: "#C9A96E" }}>{r.price}</span>
                    <button className="font-sans text-[.65rem] uppercase tracking-[.08em]"
                      style={{ padding: ".45rem 1rem", borderRadius: 7, background: "#C9A96E", color: "#051F20", border: "none", cursor: "pointer", fontWeight: 700, transition: "all .2s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#D4A853")}
                      onMouseLeave={e => (e.currentTarget.style.background = "#C9A96E")}>
                      {c.buyBtn}
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Reader */}
      <section style={{ background: "#051F20", padding: "4rem 2.5rem", borderTop: "1px solid rgba(142,182,155,.07)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <h2 className={clsx("font-serif font-semibold mb-6 text-center", isAm && "font-ethiopic")}
              style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", color: "#DAF1DE" }}>{c.readerTitle}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ background: "rgba(11,43,38,.5)", borderRadius: 16, border: "1px solid rgba(142,182,155,.12)", overflow: "hidden" }}>
              {/* Reader toolbar */}
              <div style={{ background: "rgba(5,31,32,.6)", padding: ".8rem 1.2rem", borderBottom: "1px solid rgba(142,182,155,.1)", display: "flex", alignItems: "center", gap: ".8rem" }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#C0392B", display: "inline-block" }} />
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#C9A96E", display: "inline-block" }} />
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#8EB69B", display: "inline-block" }} />
                <span className="font-sans text-[.68rem]" style={{ marginLeft: ".8rem", color: "rgba(218,241,222,.35)" }}>PDF Reader</span>
              </div>
              {/* Reader body */}
              <div style={{ minHeight: 340, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem", padding: "3rem" }}>
                <span style={{ fontSize: "3rem", opacity: .18 }}>📄</span>
                <p className={clsx("text-center", isAm ? "font-ethiopic text-[.82rem]" : "font-sans text-[.84rem]")}
                  style={{ color: "rgba(218,241,222,.35)", maxWidth: "32ch", lineHeight: 1.7 }}>
                  {openReader ? "Fetha Negest — Page 1 of 240" : c.readerNote}
                </p>
                {!openReader && (
                  <button onClick={() => setOpenReader(true)}
                    className={clsx(isAm ? "font-ethiopic text-[.82rem]" : "font-sans text-[.72rem] uppercase tracking-[.1em]")}
                    style={{ marginTop: ".5rem", padding: ".7rem 1.8rem", borderRadius: 50, background: "#235347", color: "#DAF1DE", border: "none", cursor: "pointer", fontWeight: 600, transition: "all .25s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#163832")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#235347")}>
                    {c.previewBtn} →
                  </button>
                )}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={clsx("text-center mt-5", isAm ? "font-ethiopic text-[.75rem]" : "font-sans text-[.68rem]")}
              style={{ color: "rgba(218,241,222,.28)" }}>{c.registerNote}</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
