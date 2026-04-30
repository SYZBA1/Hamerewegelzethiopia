"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/PageComponents";
import clsx from "clsx";

interface Sermon { title: string; spkr: string; date: string; dur: string }
interface Content {
  heroTag: string; heroTitle: string; heroSub: string;
  videoTitle: string; audioTitle: string; featuredTitle: string;
  archiveTitle: string; archiveSub: string; archiveBtn: string;
  filters: string[]; sermons: Sermon[];
  listen: string; watch: string; download: string; viewAll: string;
}

const ICONS = ["🕊", "📖", "✝", "🙏", "⛪", "📜"];
const COLORS = ["#A6FF4D", "#D6FF00", "#D6FF00", "#A6FF4D", "#D6FF00", "#D6FF00"];

const videoMeta = [
  {
    src: "https://www.youtube.com/embed/_cFKVblYA64",
    title: "ብርሃን:፦ ከጨለማ ያመለጥንው ብርሃን በሆነው በክርስቶስ ነው። ሐመረ ወንጌል ዘኢትዮጲያ",
    program: "Hamere Wengel Zethiopia",
  },
  {
    src: "https://www.youtube.com/embed/csGRAsYg9NU",
    title: "እኛ ግን የተሰቀለውን ክርስቶስን እንሰብካለን ልዮ የገና በአል መታሰቢያ ክፍል4 ሐመረ ወንጌል ዘኢትዮጲያ",
    program: "እኛ ግን የተሰቀለውን ክርስቶስን",
  },
  {
    src: "https://www.youtube.com/embed/1y274yc8dnA",
    title: "ዱካ ፍለጋ ክፍል 1 መ/ር ብርሃኑ አበጋዝ ሐመረ ወንጌል ዘኢትዮጲያ",
    program: "ዱካ ፍለጋ ክፍል 1",
  },
];

function VideoCard({ sermon, idx, watch, isAm }: { sermon: Sermon; idx: number; watch: string; isAm: boolean }) {
  const meta = videoMeta[idx] ?? videoMeta[0];

  return (
    <Reveal delay={idx * 0.07}>
      <div style={{ borderRadius: 14, overflow: "hidden", background: "rgba(27,27,27,.62)", border: "1px solid rgba(214,255,0,.1)", transition: "all .3s" }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(27,27,27,.35)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
        {/* Video */}
        <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden", background: "#000" }}>
          <iframe
            src={meta.src}
            title={meta.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />

          <span className="font-sans" style={{ position: "absolute", bottom: 8, right: 10, fontSize: ".62rem", background: "rgba(27,27,27,.65)", color: "#F7F7F7", padding: ".15rem .5rem", borderRadius: 4 }}>{sermon.dur}</span>
        </div>
        {/* Info */}
        <div style={{ padding: "1.2rem 1.4rem" }}>
          <h3 className={clsx("font-serif font-semibold", isAm && "font-ethiopic")}
            style={{ fontSize: "1rem", color: "#F7F7F7", lineHeight: isAm ? 1.5 : 1.25, marginBottom: ".4rem" }}>{meta.title}</h3>
          <p className={clsx(isAm ? "font-ethiopic text-[.74rem]" : "font-sans text-[.72rem]")}
            style={{ color: "#D6FF00", marginBottom: ".35rem" }}>{meta.program}</p>
          <p className={clsx(isAm ? "font-ethiopic text-[.74rem]" : "font-sans text-[.72rem]")}
            style={{ color: "#D6FF00", marginBottom: ".2rem" }}>{sermon.spkr}</p>
          <p className="font-sans text-[.64rem]" style={{ color: "rgba(247,247,247,.4)" }}>{sermon.date}</p>
        </div>
      </div>
    </Reveal>
  );
}

function AudioCard({ sermon, idx, listen, download, isAm }: { sermon: Sermon; idx: number; listen: string; download: string; isAm: boolean }) {
  return (
    <Reveal delay={idx * 0.06}>
      <div style={{ background: "rgba(27,27,27,.6)", borderRadius: 12, border: "1px solid rgba(214,255,0,.1)", padding: "1.4rem 1.6rem", display: "flex", alignItems: "center", gap: "1.2rem", transition: "all .25s" }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(214,255,0,.28)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(7,102,83,.35)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(214,255,0,.1)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(27,27,27,.6)"; }}>
        {/* Play circle */}
        <button style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(90deg,#A6FF4D,#D6FF00)", border: "none", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "filter .2s" }}
          onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.04)")}
          onMouseLeave={e => (e.currentTarget.style.filter = "none")}>
          <span style={{ color: "#1B1B1B", fontSize: ".85rem", marginLeft: 2 }}>▶</span>
        </button>
        {/* Waveform bars (decorative) */}
        <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
          {[10, 18, 12, 22, 15, 9, 20, 14, 8, 16].map((h, i) => (
            <div key={i} style={{ width: 3, height: h, borderRadius: 2, background: "rgba(214,255,0,.35)" }} />
          ))}
        </div>
        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 className={clsx("font-serif font-semibold", isAm && "font-ethiopic")}
            style={{ fontSize: ".95rem", color: "#F7F7F7", lineHeight: isAm ? 1.5 : 1.2, marginBottom: ".25rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sermon.title}</h3>
          <p className={clsx(isAm ? "font-ethiopic text-[.72rem]" : "font-sans text-[.7rem]")} style={{ color: "#D6FF00" }}>{sermon.spkr}</p>
        </div>
        {/* Duration + download */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: ".4rem", flexShrink: 0 }}>
          <span className="font-sans" style={{ fontSize: ".62rem", color: "rgba(247,247,247,.42)" }}>{sermon.dur}</span>
          <button className={clsx(isAm ? "font-ethiopic text-[.68rem]" : "font-sans text-[.62rem] uppercase tracking-[.08em]")}
            style={{ color: "rgba(247,247,247,.58)", background: "transparent", border: "1px solid rgba(214,255,0,.18)", borderRadius: 6, padding: ".2rem .6rem", cursor: "pointer", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#D6FF00"; e.currentTarget.style.borderColor = "#D6FF00"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(247,247,247,.58)"; e.currentTarget.style.borderColor = "rgba(214,255,0,.18)"; }}>
            ↓ {download}
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export default function SermonsClient({ locale, c }: { locale: string; c: Content }) {
  const isAm = locale === "am";
  const [activeFilter, setActiveFilter] = useState(0);
  const heroImage = "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1600&auto=format&fit=crop";
  const heroCardImage = "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1400&auto=format&fit=crop";

  return (
    <div style={{ background: "linear-gradient(180deg, rgba(247,247,247,.94), rgba(227,239,38,.08))" }}>
      <section className="relative overflow-hidden">
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
                Home • Events
              </p>

              <h1 className={clsx("font-bold leading-[1.15] text-white", isAm ? "font-ethiopic text-[clamp(1.5rem,4vw,2.8rem)]" : "font-serif text-[clamp(1.8rem,4vw,3.3rem)]")}>{c.heroTitle}</h1>

              <p className={clsx("mt-6 max-w-xl text-white", isAm ? "font-ethiopic text-[0.94rem] leading-[1.9]" : "font-sans text-[0.95rem] leading-[1.9]")}>{c.heroSub}</p>

              <Link
                href="#sermons-content"
                className={clsx(
                  "mt-8 inline-flex items-center gap-2 text-white hover:text-[#d6ff00] hover:gap-3 transition-all",
                  isAm ? "font-ethiopic text-[0.92rem]" : "font-sans text-[0.78rem] uppercase tracking-[0.14em] font-semibold"
                )}
              >
                {isAm ? "ተጨማሪ ይመልከቱ" : "Learn More"}
                <ArrowRight size={14} />
              </Link>
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

      {/* Filters */}
      <div id="sermons-content" style={{ background: "linear-gradient(90deg, rgba(203,234,0,.2), rgba(227,239,38,.14))", padding: "1.8rem 2.5rem", borderBottom: "1px solid rgba(166,255,77,.14)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
          {c.filters.map((f, i) => (
            <button key={i} onClick={() => setActiveFilter(i)}
              className={clsx(isAm ? "font-ethiopic text-[.76rem]" : "font-sans text-[.68rem] uppercase tracking-[.1em]")}
              style={{ padding: ".38rem 1.1rem", borderRadius: 50, cursor: "pointer", transition: "all .2s",
                border: `1px solid ${activeFilter === i ? "#A6FF4D" : "rgba(214,255,0,.22)"}`,
                background: activeFilter === i ? "linear-gradient(90deg,#D6FF00,#A6FF4D)" : "transparent",
                color: activeFilter === i ? "#1B1B1B" : "rgba(51,51,51,.6)" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Video Sermons */}
      <section style={{ background: "linear-gradient(180deg, rgba(247,247,247,.94), rgba(227,239,38,.08))", padding: "4rem 2.5rem 3rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><h2 className={clsx("font-serif font-semibold mb-8", isAm && "font-ethiopic")}
            style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", color: "#1B1B1B" }}>{c.videoTitle}</h2></Reveal>
          <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", marginBottom: "2rem", borderRadius: 24, overflow: "hidden", background: "#000" }}>
            <iframe
              src="https://www.youtube.com/embed/_cFKVblYA64"
              title="ብርሃን:፦ ከጨለማ ያመለጥንው ብርሃን በሆነው በክርስቶስ ነው። ሐመረ ወንጌል ዘኢትዮጲያ"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.2rem" }}>
            {c.sermons.slice(0, 3).map((s, i) => <VideoCard key={i} sermon={s} idx={i} watch={c.watch} isAm={isAm} />)}
          </div>
        </div>
      </section>

      {/* Audio Sermons */}
      <section style={{ background: "linear-gradient(180deg, rgba(247,247,247,.94), rgba(227,239,38,.08))", padding: "4rem 2.5rem", borderTop: "1px solid rgba(166,255,77,.14)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><h2 className={clsx("font-serif font-semibold mb-8", isAm && "font-ethiopic")}
            style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", color: "#1B1B1B" }}>{c.audioTitle}</h2></Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: ".8rem" }}>
            {c.sermons.slice(3).map((s, i) => <AudioCard key={i} sermon={s} idx={i + 3} listen={c.listen} download={c.download} isAm={isAm} />)}
          </div>
        </div>
      </section>

      {/* YouTube Archive CTA */}
      <section style={{ background: "linear-gradient(180deg, rgba(247,247,247,.94), rgba(227,239,38,.08))", padding: "5rem 2.5rem", textAlign: "center" }}>
        <Reveal>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1.2rem", opacity: .55 }}>▶</div>
            <h2 className={clsx("font-serif font-semibold mb-4", isAm && "font-ethiopic")}
              style={{ color: "#1B1B1B", fontSize: "clamp(1.5rem,3vw,2.2rem)" }}>{c.archiveTitle}</h2>
            <p className={clsx("mb-8", isAm ? "font-ethiopic text-[.88rem]" : "font-sans text-[.94rem]")}
              style={{ color: "rgba(51,51,51,.72)", lineHeight: 1.7 }}>{c.archiveSub}</p>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className={clsx(isAm ? "font-ethiopic text-[.88rem]" : "font-sans text-[.78rem] uppercase tracking-[.12em]")}
              style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", padding: ".9rem 2.4rem", borderRadius: 50, background: "linear-gradient(90deg,#A6FF4D,#D6FF00)", color: "#1B1B1B", textDecoration: "none", fontWeight: 600, boxShadow: "0 4px 24px rgba(214,255,0,.28)", transition: "all .25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1.04)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.filter = "none"; (e.currentTarget as HTMLAnchorElement).style.transform = "none"; }}>
              ▶ {c.archiveBtn}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
