"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { Reveal, PageHero, SectionTitle } from "@/components/PageComponents";
import clsx from "clsx";

interface Cause { title: string; desc: string; amount: string }
interface Content {
  heroTag: string; heroTitle: string; heroSub: string;
  amountLabel: string; customLabel: string;
  freqs: string[]; intlTitle: string; localTitle: string;
  causes: Cause[]; methodsTitle: string;
  btnDonate: string; secureNote: string;
  stripeLabel: string; paypalLabel: string;
  telebirrLabel: string; chapaLabel: string;
}

const AMOUNTS = ["$10", "$25", "$50", "$100", "$250", "$500"];
const CAUSE_ICONS = ["🎓", "📜", "🌱"];

export default function DonateClient({ locale, c }: { locale: string; c: Content }) {
  const isAm = locale === "am";
  const [activeFreq, setActiveFreq] = useState(0);
  const [activeAmt, setActiveAmt] = useState(2);
  const [custom, setCustom] = useState("");
  const [tab, setTab] = useState<"intl" | "local">("intl");

  const inputBase = "w-full rounded-lg border outline-none transition-all duration-200";

  return (
    <div>
      <PageHero tag={c.heroTag} title={c.heroTitle} sub={c.heroSub} />

      {/* Cause cards */}
      <section style={{ background: "#ffffff", padding: "5rem 2.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><SectionTitle>{c.amountLabel}</SectionTitle></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.4rem", marginBottom: "4rem" }}>
            {c.causes.map((cause, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ background: "#E8F5E9", borderRadius: 16, padding: "2rem", border: "1.5px solid transparent", transition: "all .3s", display: "flex", flexDirection: "column" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(35,83,71,.35)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(35,83,71,.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "transparent"; (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                  <span style={{ fontSize: "2rem", marginBottom: "1rem", opacity: .7 }}>{CAUSE_ICONS[i]}</span>
                  <h3 className={clsx("font-serif font-semibold", isAm && "font-ethiopic")}
                    style={{ fontSize: "1.1rem", color: "#051F20", marginBottom: ".4rem" }}>{cause.title}</h3>
                  <p className={clsx(isAm ? "font-ethiopic text-[.82rem]" : "font-sans text-[.84rem]")}
                    style={{ color: "rgba(5,31,32,.6)", lineHeight: 1.7, flex: 1, marginBottom: "1.2rem" }}>{cause.desc}</p>
                  <div style={{ paddingTop: ".8rem", borderTop: "1px solid rgba(35,83,71,.1)" }}>
                    <span className="font-serif font-semibold" style={{ fontSize: "1.05rem", color: "#235347" }}>{cause.amount}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Donation form */}
          <Reveal delay={0.12}>
            <div style={{ maxWidth: 660, margin: "0 auto", background: "linear-gradient(135deg, #051F20, #0B2B26 50%, #163832)", borderRadius: 20, padding: "2.5rem", border: "1px solid rgba(142,182,155,.12)", boxShadow: "0 20px 60px rgba(0,0,0,.25)" }}>

              {/* International / Local tab */}
              <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(142,182,155,.2)", marginBottom: "1.6rem" }}>
                {[{ key: "intl" as const, label: c.intlTitle }, { key: "local" as const, label: c.localTitle }].map(t => (
                  <button key={t.key} onClick={() => setTab(t.key)}
                    className={clsx(isAm ? "font-ethiopic text-[.8rem]" : "font-sans text-[.7rem] uppercase tracking-[.08em]")}
                    style={{ flex: 1, padding: ".65rem", border: "none", cursor: "pointer", transition: "all .2s", fontWeight: 600,
                      background: tab === t.key ? "#235347" : "transparent",
                      color: tab === t.key ? "#DAF1DE" : "rgba(218,241,222,.45)" }}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Frequency */}
              <p className={clsx("mb-2", isAm ? "font-ethiopic text-[.76rem]" : "font-sans text-[.62rem] uppercase tracking-[.14em]")}
                style={{ color: "rgba(218,241,222,.48)" }}>{c.amountLabel}</p>
              <div style={{ display: "flex", gap: ".5rem", marginBottom: "1.4rem" }}>
                {c.freqs.map((f, i) => (
                  <button key={i} onClick={() => setActiveFreq(i)}
                    className={clsx(isAm ? "font-ethiopic text-[.78rem]" : "font-sans text-[.68rem] uppercase tracking-[.08em]")}
                    style={{ flex: 1, padding: ".5rem 0", borderRadius: 8, cursor: "pointer", transition: "all .2s", fontWeight: 600,
                      background: activeFreq === i ? "#235347" : "transparent",
                      border: `1px solid ${activeFreq === i ? "#8EB69B" : "rgba(142,182,155,.2)"}`,
                      color: activeFreq === i ? "#DAF1DE" : "rgba(218,241,222,.5)" }}>
                    {f}
                  </button>
                ))}
              </div>

              {/* Amount grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: ".5rem", marginBottom: "1rem" }}>
                {AMOUNTS.map((a, i) => (
                  <button key={i} onClick={() => { setActiveAmt(i); setCustom(""); }}
                    className="font-sans font-semibold text-[.9rem]"
                    style={{ padding: ".65rem", borderRadius: 8, cursor: "pointer", transition: "all .2s",
                      background: activeAmt === i && !custom ? "#235347" : "transparent",
                      border: `1px solid ${activeAmt === i && !custom ? "#8EB69B" : "rgba(142,182,155,.2)"}`,
                      color: activeAmt === i && !custom ? "#DAF1DE" : "rgba(218,241,222,.5)" }}>
                    {a}
                  </button>
                ))}
              </div>

              {/* Custom */}
              <input type="text" value={custom} onChange={e => { setCustom(e.target.value); setActiveAmt(-1); }}
                placeholder={`$ ${c.customLabel}`}
                className={clsx(isAm ? "font-ethiopic text-[.86rem]" : "font-sans text-[.86rem]")}
                style={{ width: "100%", padding: ".7rem 1rem", borderRadius: 8, border: `1px solid ${custom ? "#8EB69B" : "rgba(142,182,155,.2)"}`, background: custom ? "rgba(35,83,71,.3)" : "rgba(255,255,255,.05)", color: "#DAF1DE", outline: "none", marginBottom: "1.4rem", transition: "all .2s" }}
              />

              {/* Payment methods */}
              <p className={clsx("mb-3", isAm ? "font-ethiopic text-[.74rem]" : "font-sans text-[.62rem] uppercase tracking-[.14em]")}
                style={{ color: "rgba(218,241,222,.38)" }}>{c.methodsTitle}</p>

              {tab === "intl" ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".7rem", marginBottom: "1.4rem" }}>
                  {[{ icon: "💳", label: c.stripeLabel, color: "#635BFF" }, { icon: "🅿", label: c.paypalLabel, color: "#003087" }].map((m, i) => (
                    <button key={i}
                      className={clsx(isAm ? "font-ethiopic text-[.82rem]" : "font-sans text-[.78rem]")}
                      style={{ padding: ".75rem", borderRadius: 10, border: "1px solid rgba(142,182,155,.2)", background: "rgba(255,255,255,.04)", color: "#DAF1DE", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", transition: "all .2s", fontWeight: 600 }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#8EB69B"; e.currentTarget.style.background = "rgba(142,182,155,.08)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(142,182,155,.2)"; e.currentTarget.style.background = "rgba(255,255,255,.04)"; }}>
                      {m.icon} {m.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".7rem", marginBottom: "1.4rem" }}>
                  {[{ icon: "📱", label: c.telebirrLabel }, { icon: "🇪🇹", label: c.chapaLabel }].map((m, i) => (
                    <button key={i}
                      className={clsx(isAm ? "font-ethiopic text-[.82rem]" : "font-sans text-[.78rem]")}
                      style={{ padding: ".75rem", borderRadius: 10, border: "1px solid rgba(142,182,155,.2)", background: "rgba(255,255,255,.04)", color: "#DAF1DE", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", transition: "all .2s", fontWeight: 600 }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#8EB69B"; e.currentTarget.style.background = "rgba(142,182,155,.08)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(142,182,155,.2)"; e.currentTarget.style.background = "rgba(255,255,255,.04)"; }}>
                      {m.icon} {m.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Donate button */}
              <button className={clsx(isAm ? "font-ethiopic text-[.9rem]" : "font-sans text-[.8rem] uppercase tracking-[.12em]")}
                style={{ width: "100%", padding: "1rem", borderRadius: 10, background: "linear-gradient(135deg,#D4A853,#C9A96E)", color: "#051F20", border: "none", cursor: "pointer", fontWeight: 700, boxShadow: "0 0 28px rgba(201,169,110,.5)", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 48px rgba(201,169,110,.8)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 28px rgba(201,169,110,.5)"; e.currentTarget.style.transform = "none"; }}>
                ❤ {c.btnDonate}
              </button>
              <p className="font-sans text-[.6rem] text-center mt-3" style={{ color: "rgba(218,241,222,.28)" }}>🔒 {c.secureNote}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
