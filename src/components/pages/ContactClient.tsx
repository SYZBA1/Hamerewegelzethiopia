"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import clsx from "clsx";
import Reveal from "@/components/Reveal";

interface C {
  heroTag: string; heroTitle: string; heroP: string;
  formTitle: string; fname: string; lname: string;
  email: string; phone: string; subject: string; message: string;
  subjects: string[]; submit: string; submitNote: string;
  addressTitle: string; addressLines: string[];
  phoneLabel: string; phoneVal: string;
  emailLabel: string; emailVal: string;
  hoursLabel: string; hoursVal: string;
  mapTitle: string; socialTitle: string;
}

export default function ContactClient({ locale, c }: { locale: string; c: C }) {
  const isAm = locale === "am";
  const [sent, setSent] = useState(false);
  const serif = clsx("font-serif", isAm && "font-ethiopic");
  const body  = isAm ? "font-ethiopic" : "font-sans";

  const inputCls = clsx("w-full px-4 py-3 rounded-xl border border-forest/20 bg-white outline-none",
    "focus:border-forest/55 focus:shadow-[0_0_0_3px_rgba(35,83,71,.08)] transition-all text-deep",
    isAm ? "font-ethiopic text-[0.88rem]" : "font-sans text-[0.9rem]");

  const labelCls = clsx("block mb-1.5 font-medium text-deep/70",
    isAm ? "font-ethiopic text-[0.78rem]" : "font-sans text-[0.68rem] uppercase tracking-[0.12em]");

  const INFO = [
    { Icon: MapPin, label: c.addressTitle,   val: c.addressLines.join(", "), href: "#" },
    { Icon: Phone,  label: c.phoneLabel,     val: c.phoneVal,               href: `tel:${c.phoneVal}` },
    { Icon: Mail,   label: c.emailLabel,     val: c.emailVal,               href: `mailto:${c.emailVal}` },
    { Icon: Clock,  label: c.hoursLabel,     val: c.hoursVal,               href: "#" },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[50vh] flex items-end pb-20 px-8 overflow-hidden"
        style={{ background: "linear-gradient(135deg,#051F20,#0B2B26 40%,#163832 80%,#235347)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(142,182,155,.06) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative z-10 max-w-4xl">
          <Reveal>
            <span className={clsx("inline-flex items-center gap-3 text-gold mb-5",
              isAm ? "font-ethiopic text-[0.78rem]" : "font-sans text-[0.62rem] uppercase tracking-[0.28em]")}>
              <span className="block w-8 h-px bg-gold flex-shrink-0" />{c.heroTag}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className={clsx("font-serif font-semibold text-white mb-5 leading-[1.08]",
              "text-[clamp(2.2rem,5vw,3.8rem)]", isAm && "font-ethiopic leading-[1.4]")}>{c.heroTitle}</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={clsx("text-mist/62 max-w-[52ch] leading-[1.85]",
              isAm ? "font-ethiopic text-[0.9rem]" : "font-sans text-[0.96rem]")}>{c.heroP}</p>
          </Reveal>
        </div>
      </section>

      {/* ── FORM + INFO SPLIT ── */}
      <section className="py-28 px-8" style={{ background: "#ffffff" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* Form */}
          <Reveal direction="left">
            <h2 className={clsx(serif, "font-semibold text-deep mb-8 text-[clamp(1.5rem,2.5vw,2rem)]")}>{c.formTitle}</h2>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-64 rounded-2xl border-2 border-dashed border-forest/25 text-center px-8"
                style={{ background: "#E8F5E9" }}>
                <div className="w-14 h-14 rounded-full bg-forest/10 flex items-center justify-center mb-4">
                  <Send size={22} className="text-forest" />
                </div>
                <p className={clsx(serif, "font-semibold text-deep text-lg mb-2")}>
                  {isAm ? "ተልኳል! 🙏" : "Message Sent! 🙏"}
                </p>
                <p className={clsx(body, "text-deep/55 text-sm")}>{c.submitNote}</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelCls}>{c.fname}</label><input type="text" required className={inputCls} /></div>
                  <div><label className={labelCls}>{c.lname}</label><input type="text" required className={inputCls} /></div>
                </div>
                <div><label className={labelCls}>{c.email}</label><input type="email" required className={inputCls} /></div>
                <div><label className={labelCls}>{c.phone}</label><input type="tel" className={inputCls} /></div>
                <div>
                  <label className={labelCls}>{c.subject}</label>
                  <select className={clsx(inputCls, "cursor-pointer")}>
                    {c.subjects.map((s, i) => <option key={i}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>{c.message}</label>
                  <textarea required rows={5} className={clsx(inputCls, "resize-none")} />
                </div>
                <button type="submit"
                  className={clsx("w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold",
                    "bg-forest text-mist hover:bg-mid hover:-translate-y-0.5 transition-all duration-200",
                    "shadow-[0_4px_24px_rgba(35,83,71,.3)]",
                    isAm ? "font-ethiopic text-[0.9rem]" : "font-sans text-[0.8rem] uppercase tracking-[0.1em]")}>
                  <Send size={15} />{c.submit}
                </button>
                <p className={clsx("text-center", isAm ? "font-ethiopic text-[0.72rem]" : "font-sans text-[0.65rem]", "text-deep/35")}>
                  {c.submitNote}
                </p>
              </form>
            )}
          </Reveal>

          {/* Info panel */}
          <Reveal direction="right">
            <h2 className={clsx(serif, "font-semibold text-deep mb-8 text-[clamp(1.5rem,2.5vw,2rem)]")}>{c.addressTitle}</h2>
            <div className="space-y-5 mb-10">
              {INFO.map(({ Icon, label, val, href }, i) => (
                <a key={i} href={href}
                  className="group flex items-start gap-4 p-5 rounded-xl border border-transparent hover:border-forest/25 hover:shadow-[0_4px_20px_rgba(35,83,71,.08)] transition-all duration-250 block"
                  style={{ background: "#E8F5E9" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-forest/10 group-hover:bg-forest/20 transition-colors">
                    <Icon size={16} className="text-forest" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className={clsx(body, "text-forest font-semibold mb-0.5", isAm ? "text-[0.72rem]" : "text-[0.65rem] uppercase tracking-[0.12em]")}>{label}</p>
                    <p className={clsx(body, "text-deep/70 leading-relaxed", isAm ? "text-[0.85rem]" : "text-[0.88rem]")}>{val}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className={clsx(body, "text-deep/50 mb-4", isAm ? "text-[0.75rem]" : "text-[0.62rem] uppercase tracking-[0.2em]")}>{c.socialTitle}</p>
              <div className="flex gap-3">
                {[
                  { label: "Facebook", icon: "f", color: "#1877F2" },
                  { label: "YouTube",  icon: "▶", color: "#FF0000" },
                  { label: "Telegram", icon: "✈", color: "#0088CC" },
                  { label: "Twitter",  icon: "𝕏", color: "#000" },
                ].map(s => (
                  <a key={s.label} href="#" title={s.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold transition-transform hover:-translate-y-0.5"
                    style={{ background: s.color }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="py-20 px-8" style={{ background: "#E8F5E9" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className={clsx(serif, "font-semibold text-deep text-[clamp(1.5rem,2.5vw,1.9rem)]")}>{c.mapTitle}</h2>
            <div className="w-12 h-[2px] bg-gradient-to-r from-forest to-transparent mx-auto mt-4 rounded-full" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(35,83,71,.18)]">
              {/* Stylised SVG map centred on Addis Ababa */}
              <svg viewBox="0 0 100 60" className="w-full"
                style={{ background: "linear-gradient(135deg,#163832,#0B2B26,#051F20)", minHeight: 280 }}>
                <path d="M42 18 Q55 14 65 20 Q70 30 66 42 Q58 52 50 50 Q42 45 40 35 Q38 25 42 18Z" fill="rgba(142,182,155,.09)" />
                <path d="M46 25 Q50 22 54 26 Q56 32 53 36 Q49 39 46 37 Q43 32 46 25Z" fill="rgba(142,182,155,.06)" />
                {/* Roads from HQ */}
                {[[52,30,52,10],[52,30,70,30],[52,30,30,30],[52,30,52,50]].map(([x1,y1,x2,y2], i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(142,182,155,.1)" strokeWidth=".5" />
                ))}
                {/* HQ pulse */}
                <circle cx="52" cy="30" r="7" fill="rgba(201,169,110,.08)" />
                <circle cx="52" cy="30" r="4.5" fill="rgba(201,169,110,.15)" />
                <circle cx="52" cy="30" r="3" fill="#C9A96E" opacity=".9" />
                <circle cx="52" cy="30" r="1.2" fill="#fff" opacity=".7" />
                {/* Label */}
                <text x="56" y="28" fontSize="3.5" fill="rgba(218,241,222,.5)" fontFamily="DM Sans,sans-serif">Addis Ababa HQ</text>
              </svg>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
