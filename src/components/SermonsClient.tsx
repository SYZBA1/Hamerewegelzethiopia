"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { Reveal, PageHero, SectionTitle } from "@/components/PageComponents";
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
const COLORS = ["#235347", "#163832", "#0B2B26", "#235347", "#163832", "#0B2B26"];

function VideoCard({ sermon, idx, watch, isAm }: { sermon: Sermon; idx: number; watch: string; isAm: boolean }) {
  return (
    <Reveal delay={idx * 0.07}>
      <div style={{ borderRadius: 14, overflow: "hidden", background: "#0B2B26", border: "1px solid rgba(142,182,155,.1)", transition: "all .3s" }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,.35)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
        {/* Thumbnail */}
        <div style={{ aspectRatio: "16/9", background: COLORS[idx], display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <span style={{ fontSize: "2.5rem", opacity: .2 }}>{ICONS[idx]}</span>
          <button style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(201,169,110,.85)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .2s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
              <span style={{ color: "#051F20", fontSize: "1.1rem", marginLeft: 3 }}>▶</span>
            </div>
          </button>
          <span className="font-sans" style={{ position: "absolute", bottom: 8, right: 10, fontSize: ".62rem", background: "rgba(0,0,0,.65)", color: "#fff", padding: ".15rem .5rem", borderRadius: 4 }}>{sermon.dur}</span>
        </div>
        {/* Info */}
        <div style={{ padding: "1.2rem 1.4rem" }}>
          <h3 className={clsx("font-serif font-semibold", isAm && "font-ethiopic")}
            style={{ fontSize: "1rem", color: "#DAF1DE", lineHeight: isAm ? 1.5 : 1.25, marginBottom: ".4rem" }}>{sermon.title}</h3>
          <p className={clsx(isAm ? "font-ethiopic text-[.74rem]" : "font-sans text-[.72rem]")} style={{ color: "#8EB69B", marginBottom: ".2rem" }}>{sermon.spkr}</p>
          <p className="font-sans text-[.64rem]" style={{ color: "rgba(218,241,222,.35)" }}>{sermon.date}</p>
        </div>
      </div>
    </Reveal>
  );
}

function AudioCard({ sermon, idx, listen, download, isAm }: { sermon: Sermon; idx: number; listen: string; download: string; isAm: boolean }) {
  return (
    <Reveal delay={idx * 0.06}>
      <div style={{ background: "rgba(11,43,38,.6)", borderRadius: 12, border: "1px solid rgba(142,182,155,.1)", padding: "1.4rem 1.6rem", display: "flex", alignItems: "center", gap: "1.2rem", transition: "all .25s" }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(142,182,155,.28)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(35,83,71,.2)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(142,182,155,.1)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(11,43,38,.6)"; }}>
        {/* Play circle */}
        <button style={{ width: 42, height: 42, borderRadius: "50%", background: "#235347", border: "none", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#163832")}
          onMouseLeave={e => (e.currentTarget.style.background = "#235347")}>
          <span style={{ color: "#DAF1DE", fontSize: ".85rem", marginLeft: 2 }}>▶</span>
        </button>
        {/* Waveform bars (decorative) */}
        <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
          {[10, 18, 12, 22, 15, 9, 20, 14, 8, 16].map((h, i) => (
            <div key={i} style={{ width: 3, height: h, borderRadius: 2, background: "rgba(142,182,155,.35)" }} />
          ))}
        </div>
        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 className={clsx("font-serif font-semibold", isAm && "font-ethiopic")}
            style={{ fontSize: ".95rem", color: "#DAF1DE", lineHeight: isAm ? 1.5 : 1.2, marginBottom: ".25rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sermon.title}</h3>
          <p className={clsx(isAm ? "font-ethiopic text-[.72rem]" : "font-sans text-[.7rem]")} style={{ color: "#8EB69B" }}>{sermon.spkr}</p>
        </div>
        {/* Duration + download */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: ".4rem", flexShrink: 0 }}>
          <span className="font-sans" style={{ fontSize: ".62rem", color: "rgba(218,241,222,.38)" }}>{sermon.dur}</span>
          <button className={clsx(isAm ? "font-ethiopic text-[.68rem]" : "font-sans text-[.62rem] uppercase tracking-[.08em]")}
            style={{ color: "rgba(142,182,155,.55)", background: "transparent", border: "1px solid rgba(142,182,155,.18)", borderRadius: 6, padding: ".2rem .6rem", cursor: "pointer", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#8EB69B"; e.currentTarget.style.borderColor = "#8EB69B"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(142,182,155,.55)"; e.currentTarget.style.borderColor = "rgba(142,182,155,.18)"; }}>
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

  return (
    <div>
      <PageHero tag={c.heroTag} title={c.heroTitle} sub={c.heroSub} />

      {/* Filters */}
      <div style={{ background: "#051F20", padding: "2rem 2.5rem 0", borderBottom: "1px solid rgba(142,182,155,.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
          {c.filters.map((f, i) => (
            <button key={i} onClick={() => setActiveFilter(i)}
              className={clsx(isAm ? "font-ethiopic text-[.76rem]" : "font-sans text-[.68rem] uppercase tracking-[.1em]")}
              style={{ padding: ".38rem 1.1rem", borderRadius: 50, cursor: "pointer", transition: "all .2s",
                border: `1px solid ${activeFilter === i ? "#8EB69B" : "rgba(142,182,155,.22)"}`,
                background: activeFilter === i ? "rgba(142,182,155,.14)" : "transparent",
                color: activeFilter === i ? "#8EB69B" : "rgba(218,241,222,.42)" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Video Sermons */}
      <section style={{ background: "#051F20", padding: "4rem 2.5rem 3rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><h2 className={clsx("font-serif font-semibold mb-8", isAm && "font-ethiopic")}
            style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", color: "#DAF1DE" }}>{c.videoTitle}</h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.2rem" }}>
            {c.sermons.slice(0, 3).map((s, i) => <VideoCard key={i} sermon={s} idx={i} watch={c.watch} isAm={isAm} />)}
          </div>
        </div>
      </section>

      {/* Audio Sermons */}
      <section style={{ background: "#0B2B26", padding: "4rem 2.5rem", borderTop: "1px solid rgba(142,182,155,.07)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><h2 className={clsx("font-serif font-semibold mb-8", isAm && "font-ethiopic")}
            style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", color: "#DAF1DE" }}>{c.audioTitle}</h2></Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: ".8rem" }}>
            {c.sermons.slice(3).map((s, i) => <AudioCard key={i} sermon={s} idx={i + 3} listen={c.listen} download={c.download} isAm={isAm} />)}
          </div>
        </div>
      </section>

      {/* YouTube Archive CTA */}
      <section style={{ background: "#163832", padding: "5rem 2.5rem", textAlign: "center" }}>
        <Reveal>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1.2rem", opacity: .55 }}>▶</div>
            <h2 className={clsx("font-serif font-semibold text-white mb-4", isAm && "font-ethiopic")}
              style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)" }}>{c.archiveTitle}</h2>
            <p className={clsx("mb-8", isAm ? "font-ethiopic text-[.88rem]" : "font-sans text-[.94rem]")}
              style={{ color: "rgba(218,241,222,.6)", lineHeight: 1.7 }}>{c.archiveSub}</p>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className={clsx(isAm ? "font-ethiopic text-[.88rem]" : "font-sans text-[.78rem] uppercase tracking-[.12em]")}
              style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", padding: ".9rem 2.4rem", borderRadius: 50, background: "#C0392B", color: "#fff", textDecoration: "none", fontWeight: 600, boxShadow: "0 4px 24px rgba(192,57,43,.4)", transition: "all .25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#E74C3C"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#C0392B"; (e.currentTarget as HTMLAnchorElement).style.transform = "none"; }}>
              ▶ {c.archiveBtn}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
