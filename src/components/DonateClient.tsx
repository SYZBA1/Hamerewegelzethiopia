"use client";

import { useState } from "react";
import { Reveal, SectionTitle } from "@/components/PageComponents";
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
  const heroImage = "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1600&auto=format&fit=crop";
  const [activeFreq, setActiveFreq] = useState(0);
  const [activeAmt, setActiveAmt] = useState(2);
  const [custom, setCustom] = useState("");
  const [tab, setTab] = useState<"intl" | "local">("intl");

  const inputBase = "w-full rounded-lg border outline-none transition-all duration-200";

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroImage}')` }} />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(7,12,9,0.84)_0%,rgba(7,12,9,0.58)_42%,rgba(7,12,9,0.82)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(8,13,10,0.68))]" />
        <div className="relative mx-auto max-w-6xl px-6 md:px-10 pt-24 md:pt-28 pb-14 md:pb-16">
          <p className={clsx("mb-4 text-[#d6ff00]", isAm ? "font-ethiopic text-[0.82rem]" : "font-sans text-[0.72rem] uppercase tracking-[0.2em]")}>{c.heroTag}</p>
          <h1 className={clsx("font-bold leading-[1.15] text-white", isAm ? "font-ethiopic text-[clamp(1.5rem,4vw,2.8rem)]" : "font-serif text-[clamp(1.8rem,4vw,3.3rem)]")}>{c.heroTitle}</h1>
          <p className={clsx("mt-6 max-w-2xl text-white", isAm ? "font-ethiopic text-[0.94rem] leading-[1.9]" : "font-sans text-[0.95rem] leading-[1.9]")}>{c.heroSub}</p>
        </div>
      </section>

      {/* Cause cards */}
      <section style={{ background: "#F7F7F7", padding: "5rem 2.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><SectionTitle>{c.amountLabel}</SectionTitle></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.4rem", marginBottom: "4rem" }}>
            {c.causes.map((cause, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ background: "#F7F7F7", borderRadius: 16, padding: "2rem", border: "1.5px solid transparent", transition: "all .3s", display: "flex", flexDirection: "column" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(27,27,27,.35)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(27,27,27,.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "transparent"; (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                  <span style={{ fontSize: "2rem", marginBottom: "1rem", opacity: .7 }}>{CAUSE_ICONS[i]}</span>
                  <h3 className={clsx("font-serif font-semibold", isAm && "font-ethiopic")}
                    style={{ fontSize: "1.1rem", color: "#1B1B1B", marginBottom: ".4rem" }}>{cause.title}</h3>
                  <p className={clsx(isAm ? "font-ethiopic text-[.82rem]" : "font-sans text-[.84rem]")}
                    style={{ color: "rgba(5,31,32,.6)", lineHeight: 1.7, flex: 1, marginBottom: "1.2rem" }}>{cause.desc}</p>
                  <div style={{ paddingTop: ".8rem", borderTop: "1px solid rgba(27,27,27,.1)" }}>
                    <span className="font-serif font-semibold" style={{ fontSize: "1.05rem", color: "#1B1B1B" }}>{cause.amount}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Donation form */}
          <Reveal delay={0.12}>
            <div style={{ maxWidth: 660, margin: "0 auto", background: "linear-gradient(135deg, #1B1B1B, #1B1B1B 50%, #1B1B1B)", borderRadius: 20, padding: "2.5rem", border: "1px solid rgba(0,208,132,.12)", boxShadow: "0 20px 60px rgba(27,27,27,.25)" }}>

              {/* International / Local tab */}
              <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(0,208,132,.2)", marginBottom: "1.6rem" }}>
                {[{ key: "intl" as const, label: c.intlTitle }, { key: "local" as const, label: c.localTitle }].map(t => (
                  <button key={t.key} onClick={() => setTab(t.key)}
                    className={clsx(isAm ? "font-ethiopic text-[.8rem]" : "font-sans text-[.7rem] uppercase tracking-[.08em]")}
                    style={{ flex: 1, padding: ".65rem", border: "none", cursor: "pointer", transition: "all .2s", fontWeight: 600,
                      background: tab === t.key ? "#1B1B1B" : "transparent",
                      color: tab === t.key ? "#F7F7F7" : "rgba(247,247,247,.45)" }}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Frequency */}
              <p className={clsx("mb-2", isAm ? "font-ethiopic text-[.76rem]" : "font-sans text-[.62rem] uppercase tracking-[.14em]")}
                style={{ color: "rgba(247,247,247,.48)" }}>{c.amountLabel}</p>
              <div style={{ display: "flex", gap: ".5rem", marginBottom: "1.4rem" }}>
                {c.freqs.map((f, i) => (
                  <button key={i} onClick={() => setActiveFreq(i)}
                    className={clsx(isAm ? "font-ethiopic text-[.78rem]" : "font-sans text-[.68rem] uppercase tracking-[.08em]")}
                    style={{ flex: 1, padding: ".5rem 0", borderRadius: 8, cursor: "pointer", transition: "all .2s", fontWeight: 600,
                      background: activeFreq === i ? "#1B1B1B" : "transparent",
                      border: `1px solid ${activeFreq === i ? "#00D084" : "rgba(0,208,132,.2)"}`,
                      color: activeFreq === i ? "#F7F7F7" : "rgba(247,247,247,.5)" }}>
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
                      background: activeAmt === i && !custom ? "#1B1B1B" : "transparent",
                      border: `1px solid ${activeAmt === i && !custom ? "#00D084" : "rgba(0,208,132,.2)"}`,
                      color: activeAmt === i && !custom ? "#F7F7F7" : "rgba(247,247,247,.5)" }}>
                    {a}
                  </button>
                ))}
              </div>

              {/* Custom */}
              <input type="text" value={custom} onChange={e => { setCustom(e.target.value); setActiveAmt(-1); }}
                placeholder={`$ ${c.customLabel}`}
                className={clsx(isAm ? "font-ethiopic text-[.86rem]" : "font-sans text-[.86rem]")}
                style={{ width: "100%", padding: ".7rem 1rem", borderRadius: 8, border: `1px solid ${custom ? "#00D084" : "rgba(0,208,132,.2)"}`, background: custom ? "rgba(27,27,27,.3)" : "rgba(255,255,255,.05)", color: "#F7F7F7", outline: "none", marginBottom: "1.4rem", transition: "all .2s" }}
              />

              {/* Payment methods */}
              <p className={clsx("mb-3", isAm ? "font-ethiopic text-[.74rem]" : "font-sans text-[.62rem] uppercase tracking-[.14em]")}
                style={{ color: "rgba(247,247,247,.38)" }}>{c.methodsTitle}</p>

              {tab === "intl" ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".7rem", marginBottom: "1.4rem" }}>
                  {[{ icon: "💳", label: c.stripeLabel, color: "#00D084" }, { icon: "🅿", label: c.paypalLabel, color: "#00D084" }].map((m, i) => (
                    <button key={i}
                      className={clsx(isAm ? "font-ethiopic text-[.82rem]" : "font-sans text-[.78rem]")}
                      style={{ padding: ".75rem", borderRadius: 10, border: "1px solid rgba(0,208,132,.2)", background: "rgba(255,255,255,.04)", color: "#F7F7F7", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", transition: "all .2s", fontWeight: 600 }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#00D084"; e.currentTarget.style.background = "rgba(0,208,132,.08)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,208,132,.2)"; e.currentTarget.style.background = "rgba(255,255,255,.04)"; }}>
                      {m.icon} {m.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".7rem", marginBottom: "1.4rem" }}>
                  {[{ icon: "📱", label: c.telebirrLabel }, { icon: "🇪🇹", label: c.chapaLabel }].map((m, i) => (
                    <button key={i}
                      className={clsx(isAm ? "font-ethiopic text-[.82rem]" : "font-sans text-[.78rem]")}
                      style={{ padding: ".75rem", borderRadius: 10, border: "1px solid rgba(0,208,132,.2)", background: "rgba(255,255,255,.04)", color: "#F7F7F7", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", transition: "all .2s", fontWeight: 600 }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#00D084"; e.currentTarget.style.background = "rgba(0,208,132,.08)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,208,132,.2)"; e.currentTarget.style.background = "rgba(255,255,255,.04)"; }}>
                      {m.icon} {m.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Donate button */}
              <button className={clsx(isAm ? "font-ethiopic text-[.9rem]" : "font-sans text-[.8rem] uppercase tracking-[.12em]")}
                style={{ width: "100%", padding: "1rem", borderRadius: 10, background: "#d6ff00", color: "#17351f", border: "none", cursor: "pointer", fontWeight: 700, boxShadow: "0 0 28px rgba(166,255,77,0.5)", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#a6ff4d"; e.currentTarget.style.boxShadow = "0 0 42px rgba(166,255,77,0.65)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#d6ff00"; e.currentTarget.style.boxShadow = "0 0 28px rgba(166,255,77,0.5)"; e.currentTarget.style.transform = "none"; }}>
                ❤ {c.btnDonate}
              </button>
              <p className="font-sans text-[.6rem] text-center mt-3" style={{ color: "rgba(247,247,247,.28)" }}>🔒 {c.secureNote}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
