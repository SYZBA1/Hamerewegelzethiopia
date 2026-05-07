"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { Reveal, StatChip } from "@/components/PageComponents";
import clsx from "clsx";

interface Stat { val: string; label: string }
interface Content {
  heroTag: string; heroTitle: string; heroSub: string;
  freeTitle: string; paidTitle: string; readerTitle: string;
  searchPlaceholder: string;
  categories: string[]; stats: Stat[];
  accessBtn: string; registerNote: string;
  previewBtn: string; downloadBtn: string; buyBtn: string; readerNote: string;
  readMore: string;
}

const FREE_RESOURCES = [
  { icon: "📜", type: "Manuscript", title: "Fetha Negest",               meta: "Ge'ez · Legal Code · 13th c.",   slug: "fetha-negest", free: true  },
  { icon: "📖", type: "Book",       title: "Kebra Nagast",                meta: "Ge'ez · Epic · 14th c.",         slug: "kebra-nagast", free: true  },
  { icon: "🎵", type: "Audio",      title: "Deggua Chants Collection",    meta: "Amharic · 4hr 20min",            slug: "deggua-chants-collection", free: true  },
  { icon: "📋", type: "Journal",    title: "Ethiopian Journal of Theology",meta: "English · Vol. 12",             slug: "ethiopian-journal-of-theology", free: true  },
  { icon: "📜", type: "Manuscript", title: "Andemta Commentary",          meta: "Ge'ez · Commentary",             slug: "andemta-commentary", free: true  },
  { icon: "📖", type: "Book",       title: "Introduction to Ge'ez Grammar",meta: "English · 2022",               slug: "introduction-to-geez-grammar", free: true  },
  { icon: "🎵", type: "Audio",      title: "Ziema Liturgical Hymns",      meta: "Ge'ez · 2hr 15min",             slug: "ziema-liturgical-hymns", free: true  },
  { icon: "📋", type: "Journal",    title: "Theology & Digital Mission",   meta: "English · 2023",               slug: "theology-digital-mission", free: true  },
];

const PAID_RESOURCES = [
  { icon: "📕", type: "Book",   title: "Comprehensive Ge'ez Grammar",     meta: "400 pages · PDF + Print",  price: "$4.99", slug: "comprehensive-geez-grammar" },
  { icon: "📗", type: "Book",   title: "Ethiopian Church History Vol. I", meta: "320 pages · PDF",           price: "$3.99", slug: "ethiopian-church-history-vol-i" },
  { icon: "📘", type: "Book",   title: "The Theology of Tabots",          meta: "250 pages · PDF",           price: "$4.99", slug: "the-theology-of-tabots" },
  { icon: "📙", type: "Course", title: "Ge'ez Reading Crash Course",      meta: "12 Lessons · Audio + PDF", price: "$9.99", slug: "geez-reading-crash-course" },
];

export default function LibraryClient({ locale, c }: { locale: string; c: Content }) {
  const isAm = locale === "am";
  const [query, setQuery]       = useState("");
  const [activeCat, setActiveCat] = useState(0);
  const [openReader, setOpenReader] = useState(false);
  const heroImage = "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop";
  const heroCardImage = "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1400&auto=format&fit=crop";

  const normalizedQuery = query.trim().toLowerCase();
  const categoryKey = (["all", "manuscript", "book", "audio", "journal"] as const)[activeCat] ?? "all";
  const filteredFreeResources = FREE_RESOURCES.filter((resource) => {
    const matchesCategory = categoryKey === "all"
      ? true
      : resource.type.toLowerCase() === categoryKey;
    const searchableText = `${resource.title} ${resource.meta} ${resource.type}`.toLowerCase();
    const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });

  return (
    <div>
      {/* Hero with search */}
      <section className="relative overflow-hidden" data-hero-sync="true">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroImage}')` }} />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(7,12,9,0.82)_0%,rgba(7,12,9,0.52)_42%,rgba(7,12,9,0.78)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,transparent,rgba(8,13,10,0.68))]" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-24 md:pt-28 pb-16 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <Reveal>
              <p
                className={clsx(
                  "mb-4 text-[#d6ff00]",
                  isAm ? "font-ethiopic text-[0.82rem]" : "font-sans text-[0.72rem] uppercase tracking-[0.2em]"
                )}
              >
                Home • Library
              </p>

              <h1 className={clsx("font-bold leading-[1.15] text-white", isAm ? "font-ethiopic text-[clamp(1.5rem,4vw,2.8rem)]" : "font-serif text-[clamp(1.8rem,4vw,3.3rem)]")}>{c.heroTitle}</h1>

              <p className={clsx("mt-6 max-w-xl text-white", isAm ? "font-ethiopic text-[0.94rem] leading-[1.9]" : "font-sans text-[0.95rem] leading-[1.9]")}>{c.heroSub}</p>

              <div style={{ position: "relative", maxWidth: 560, marginTop: "2rem" }}>
                <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", opacity: .52, pointerEvents: "none", fontSize: "1rem", color: "#F7F7F7" }}>🔍</span>
                <input
                  type="text" value={query} onChange={e => setQuery(e.target.value)}
                  placeholder={c.searchPlaceholder}
                  className={clsx(isAm ? "font-ethiopic text-[.86rem]" : "font-sans text-[.88rem]")}
                  style={{ width: "100%", padding: ".9rem 1rem .9rem 2.8rem", background: "rgba(247,247,247,.1)", border: "1px solid rgba(214,255,0,.22)", borderRadius: 10, color: "#F7F7F7", outline: "none", transition: "border-color .2s" }}
                  onFocus={e => (e.target.style.borderColor = "#D6FF00")}
                  onBlur={e => (e.target.style.borderColor = "rgba(214,255,0,.22)")}
                />
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="relative h-[300px] sm:h-[360px] lg:h-[400px]">
                <div className="absolute -right-4 -top-4 md:-right-6 md:-top-6 w-[55%] h-[92%] bg-[linear-gradient(180deg,#d6ff00_0%,#a6ff4d_45%,#79b93f_100%)]" />
                <div className="absolute inset-x-0 top-7 sm:top-10 h-[78%] home-glass-panel shadow-[0_24px_55px_rgba(39,69,20,0.25)] overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroCardImage}')` }} />
                  <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(15,27,20,0.2))]" />
                  <div className="absolute left-4 bottom-4 rounded-full px-3 py-1 text-[11px] tracking-[0.12em] uppercase bg-white/75 text-[#1e2012] font-semibold">
                    {c.heroTag}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <div style={{ background: "linear-gradient(180deg, #1B1B1B, #00D084)", borderBottom: "1px solid rgba(214,255,0,.07)", padding: "2.5rem 2.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem" }}>
          {c.stats.map((s, i) => <StatChip key={i} val={s.val} label={s.label} light />)}
        </div>
      </div>

      {/* Category filters + free grid */}
      <section style={{ background: "linear-gradient(180deg, rgba(247,247,247,.94), rgba(227,239,38,.08))", padding: "4rem 2.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <h2 className={clsx("font-serif font-semibold mb-6", isAm && "font-ethiopic")}
              style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", color: "#1B1B1B" }}>{c.freeTitle}</h2>
          </Reveal>
          {/* Filters */}
          <Reveal>
            <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: "1.8rem" }}>
              {c.categories.map((cat, i) => (
                <button key={i} onClick={() => setActiveCat(i)}
                  className={clsx(isAm ? "font-ethiopic text-[.76rem]" : "font-sans text-[.68rem] uppercase tracking-[.1em]")}
                  style={{ padding: ".38rem 1rem", borderRadius: 50, cursor: "pointer", transition: "all .2s",
                    border: `1px solid ${activeCat === i ? "#A6FF4D" : "rgba(214,255,0,.2)"}`,
                    background: activeCat === i ? "linear-gradient(90deg,#D6FF00,#A6FF4D)" : "transparent",
                    color: activeCat === i ? "#1B1B1B" : "rgba(51,51,51,.62)" }}>
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
          {/* Free resource cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1rem" }}>
            {filteredFreeResources.map((r, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{ background: "rgba(27,27,27,.56)", borderRadius: 12, padding: "1.4rem", border: "1px solid rgba(214,255,0,.1)", transition: "all .25s", cursor: "pointer" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(7,102,83,.4)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(214,255,0,.28)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(27,27,27,.56)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(214,255,0,.1)"; }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".8rem" }}>
                    <span style={{ fontSize: "1.4rem", opacity: .65 }}>{r.icon}</span>
                    <span className="font-sans" style={{ fontSize: ".52rem", letterSpacing: ".08em", textTransform: "uppercase", color: "#D6FF00", background: "rgba(214,255,0,.1)", padding: ".15rem .5rem", borderRadius: 20, border: "1px solid rgba(214,255,0,.2)" }}>{r.type}</span>
                  </div>
                  <h4 className="font-serif font-semibold" style={{ fontSize: ".95rem", color: "#F7F7F7", lineHeight: 1.3, marginBottom: ".4rem" }}>{r.title}</h4>
                  <p className="font-sans text-[.65rem]" style={{ color: "rgba(247,247,247,.45)", lineHeight: 1.5, marginBottom: ".9rem" }}>{r.meta}</p>
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <Link href={`/${locale}/library/book/${r.slug}`} className={clsx(isAm ? "font-ethiopic text-[.7rem]" : "font-sans text-[.64rem] uppercase tracking-[.08em]", "flex-1 rounded-[0.45rem] bg-forest text-[#111] text-center font-bold px-3 py-2 transition duration-200 hover:bg-[#c0ff7f]")}>
                      {c.readMore}
                    </Link>
                    <button className="font-sans text-[.64rem]"
                      style={{ padding: ".45rem .8rem", borderRadius: 7, background: "transparent", color: "rgba(247,247,247,.6)", border: "1px solid rgba(214,255,0,.2)", cursor: "pointer", transition: "all .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#D6FF00"; e.currentTarget.style.borderColor = "#D6FF00"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "rgba(247,247,247,.6)"; e.currentTarget.style.borderColor = "rgba(214,255,0,.2)"; }}>
                      ↓
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          {filteredFreeResources.length === 0 && (
            <p className={clsx("mt-5", isAm ? "font-ethiopic text-[.8rem]" : "font-sans text-[.8rem]")}
              style={{ color: "rgba(51,51,51,.7)" }}>
              {isAm ? "ከፍለጋው ወይም ከተመረጠው ምድብ ጋር የሚመሳሰል ምንም ውጤት አልተገኘም።" : "No resources match your search and selected category."}
            </p>
          )}
        </div>
      </section>

      {/* Paid Books */}
      <section style={{ background: "linear-gradient(180deg, rgba(247,247,247,.94), rgba(227,239,38,.08))", padding: "4rem 2.5rem", borderTop: "1px solid rgba(166,255,77,.14)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><h2 className={clsx("font-serif font-semibold mb-8", isAm && "font-ethiopic")}
            style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", color: "#1B1B1B" }}>{c.paidTitle}</h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "1.2rem" }}>
            {PAID_RESOURCES.map((r, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ background: "rgba(27,27,27,.58)", borderRadius: 14, padding: "1.6rem", border: "1px solid rgba(214,255,0,.1)", transition: "all .3s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(214,255,0,.3)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(214,255,0,.1)"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}>
                  <span style={{ fontSize: "2rem", display: "block", marginBottom: ".8rem", opacity: .7 }}>{r.icon}</span>
                  <h3 className="font-serif font-semibold" style={{ fontSize: "1rem", color: "#F7F7F7", lineHeight: 1.25, marginBottom: ".4rem" }}>{r.title}</h3>
                  <p className="font-sans text-[.65rem]" style={{ color: "rgba(247,247,247,.45)", marginBottom: "1.2rem" }}>{r.meta}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="font-serif font-semibold" style={{ fontSize: "1.1rem", color: "#D6FF00" }}>{r.price}</span>
                    <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
                      <Link href={`/${locale}/library/book/${r.slug}`} className={clsx("font-sans text-[.65rem] uppercase tracking-[.08em] bg-[#F7F7F7] text-[#111] rounded-full px-3 py-2 font-semibold transition duration-200 hover:bg-[#e7f0c2]")}>
                        {c.readMore}
                      </Link>
                      <button className={clsx("font-sans text-[.65rem] uppercase tracking-[.08em]", isAm ? "font-ethiopic" : "font-sans")}
                        style={{ padding: ".45rem .8rem", borderRadius: 7, background: "transparent", color: "rgba(247,247,247,.65)", border: "1px solid rgba(214,255,0,.2)", cursor: "pointer", transition: "all .2s" }}
                        onMouseEnter={e => { e.currentTarget.style.color = "#D6FF00"; e.currentTarget.style.borderColor = "#D6FF00"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "rgba(247,247,247,.65)"; e.currentTarget.style.borderColor = "rgba(214,255,0,.2)"; }}
                      >
                        {c.buyBtn}
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Reader */}
      <section style={{ background: "linear-gradient(180deg, rgba(247,247,247,.94), rgba(227,239,38,.08))", padding: "4rem 2.5rem", borderTop: "1px solid rgba(166,255,77,.14)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <h2 className={clsx("font-serif font-semibold mb-6 text-center", isAm && "font-ethiopic")}
              style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", color: "#1B1B1B" }}>{c.readerTitle}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ background: "rgba(27,27,27,.58)", borderRadius: 16, border: "1px solid rgba(214,255,0,.12)", overflow: "hidden" }}>
              {/* Reader toolbar */}
              <div style={{ background: "rgba(27,27,27,.66)", padding: ".8rem 1.2rem", borderBottom: "1px solid rgba(214,255,0,.1)", display: "flex", alignItems: "center", gap: ".8rem" }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#A6FF4D", display: "inline-block" }} />
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#D6FF00", display: "inline-block" }} />
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#D6FF00", display: "inline-block" }} />
                <span className="font-sans text-[.68rem]" style={{ marginLeft: ".8rem", color: "rgba(247,247,247,.45)" }}>PDF Reader</span>
              </div>
              {/* Reader body */}
              <div style={{ minHeight: 340, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem", padding: "3rem" }}>
                <span style={{ fontSize: "3rem", opacity: .18 }}>📄</span>
                <p className={clsx("text-center", isAm ? "font-ethiopic text-[.82rem]" : "font-sans text-[.84rem]")}
                  style={{ color: "rgba(247,247,247,.45)", maxWidth: "32ch", lineHeight: 1.7 }}>
                  {openReader ? "Fetha Negest — Page 1 of 240" : c.readerNote}
                </p>
                {!openReader && (
                  <button onClick={() => setOpenReader(true)}
                    className={clsx(isAm ? "font-ethiopic text-[.82rem]" : "font-sans text-[.72rem] uppercase tracking-[.1em]")}
                    style={{ marginTop: ".5rem", padding: ".7rem 1.8rem", borderRadius: 50, background: "linear-gradient(90deg,#A6FF4D,#D6FF00)", color: "#1B1B1B", border: "none", cursor: "pointer", fontWeight: 600, transition: "filter .25s" }}
                    onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.04)")}
                    onMouseLeave={e => (e.currentTarget.style.filter = "none")}>
                    {c.previewBtn} →
                  </button>
                )}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={clsx("text-center mt-5", isAm ? "font-ethiopic text-[.75rem]" : "font-sans text-[.68rem]")}
              style={{ color: "rgba(247,247,247,.35)" }}>{c.registerNote}</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
