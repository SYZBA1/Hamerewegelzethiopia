"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { Reveal, PageHero, SectionTitle } from "@/components/PageComponents";
import clsx from "clsx";

interface Post {
  title: string; cat: string; date: string;
  readMin: string; excerpt: string;
}
interface Content {
  heroTag: string; heroTitle: string; heroSub: string;
  newsTitle: string; articlesTitle: string; teachingsTitle: string;
  readMore: string; minRead: string;
  posts: Post[];
}

const CAT_COLORS: Record<string, string> = {
  "News": "#C0392B", "ዜና": "#C0392B",
  "Teaching": "#235347", "ትምህርት": "#235347",
  "Article": "#163832", "ጽሑፍ": "#163832",
};

function PostCard({ post, readMore, minRead, isAm, delay = 0 }: {
  post: Post; readMore: string; minRead: string; isAm: boolean; delay?: number;
}) {
  const color = CAT_COLORS[post.cat] || "#235347";
  return (
    <Reveal delay={delay}>
      <article
        style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1.5px solid rgba(35,83,71,.1)", transition: "all .3s", display: "flex", flexDirection: "column", height: "100%" }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(35,83,71,.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(35,83,71,.1)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(35,83,71,.1)"; (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
      >
        {/* Color band */}
        <div style={{ height: 4, background: color }} />
        <div style={{ padding: "1.6rem", display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: ".9rem" }}>
            <span style={{ fontSize: ".55rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: ".18rem .55rem", borderRadius: 20, background: color, color: "#fff" }}>
              {post.cat}
            </span>
            <span className="font-sans" style={{ fontSize: ".62rem", color: "rgba(5,31,32,.4)" }}>{post.date}</span>
            <span className="font-sans" style={{ fontSize: ".62rem", color: "rgba(5,31,32,.35)", marginLeft: "auto" }}>
              {post.readMin} {minRead}
            </span>
          </div>
          {/* Title */}
          <h3 className={clsx("font-serif font-semibold", isAm && "font-ethiopic")}
            style={{ fontSize: "1.08rem", color: "#051F20", lineHeight: isAm ? 1.45 : 1.2, marginBottom: ".75rem", flex: 1 }}>
            {post.title}
          </h3>
          {/* Excerpt */}
          <p className={clsx(isAm ? "font-ethiopic text-[.8rem]" : "font-sans text-[.83rem]")}
            style={{ color: "rgba(5,31,32,.6)", lineHeight: 1.75, marginBottom: "1.2rem" }}>
            {post.excerpt}
          </p>
          {/* Read more */}
          <button
            className={clsx(isAm ? "font-ethiopic text-[.78rem]" : "font-sans text-[.7rem] uppercase tracking-[.1em]")}
            style={{ color: "#235347", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: ".4rem", paddingTop: ".8rem", borderTop: "1px solid rgba(35,83,71,.08)", transition: "gap .2s", fontWeight: 600 }}
            onMouseEnter={e => (e.currentTarget.style.gap = ".7rem")}
            onMouseLeave={e => (e.currentTarget.style.gap = ".4rem")}>
            {readMore} →
          </button>
        </div>
      </article>
    </Reveal>
  );
}

export default function BlogClient({ locale, c }: { locale: string; c: Content }) {
  const isAm = locale === "am";
  const [activeTab, setActiveTab] = useState<"all" | "news" | "article" | "teaching">("all");

  const tabs = [
    { key: "all",      label: isAm ? "ሁሉም" : "All" },
    { key: "news",     label: c.newsTitle },
    { key: "article",  label: c.articlesTitle },
    { key: "teaching", label: c.teachingsTitle },
  ] as const;

  const filtered = activeTab === "all" ? c.posts : c.posts.filter(p => {
    const cat = p.cat.toLowerCase();
    if (activeTab === "news")     return cat === "news"     || cat === "ዜና";
    if (activeTab === "article")  return cat === "article"  || cat === "ጽሑፍ";
    if (activeTab === "teaching") return cat === "teaching" || cat === "ትምህርት";
    return true;
  });

  return (
    <div style={{ background: "#ffffff" }}>
      <PageHero tag={c.heroTag} title={c.heroTitle} sub={c.heroSub} />

      {/* Tab bar */}
      <div style={{ background: "#E8F5E9", padding: "1.8rem 2.5rem", borderBottom: "1px solid rgba(35,83,71,.08)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={clsx(isAm ? "font-ethiopic text-[.8rem]" : "font-sans text-[.7rem] uppercase tracking-[.1em]")}
              style={{ padding: ".45rem 1.2rem", borderRadius: 50, cursor: "pointer", transition: "all .2s",
                border: `1px solid ${activeTab === tab.key ? "#235347" : "rgba(35,83,71,.25)"}`,
                background: activeTab === tab.key ? "#235347" : "transparent",
                color: activeTab === tab.key ? "#DAF1DE" : "rgba(5,31,32,.5)" }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <section style={{ padding: "4rem 2.5rem 6rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "1.4rem" }}>
            {filtered.map((post, i) => (
              <PostCard key={i} post={post} readMore={c.readMore} minRead={c.minRead} isAm={isAm} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
