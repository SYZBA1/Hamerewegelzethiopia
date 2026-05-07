"use client";

import { useState } from "react";
import { Reveal } from "@/components/PageComponents";
import clsx from "clsx";

interface Content {
  heroTag: string; heroTitle: string; heroSub: string;
  formTitle: string; firstName: string; lastName: string;
  emailLabel: string; phoneLabel: string; subject: string;
  message: string; placeholder: string; submit: string;
  infoTitle: string; address: string; phone: string;
  email: string; social: string; mapTitle: string;
  hoursTitle: string; hoursWeekday: string;
  hoursSaturday: string; hoursSunday: string;
}

function Label({ text, isAm }: { text: string; isAm: boolean }) {
  return (
    <label className={clsx("block mb-1.5", isAm ? "font-ethiopic text-[.78rem]" : "font-sans text-[.65rem] uppercase tracking-[.14em]")}
      style={{ color: "#ffffff", fontWeight: "bold" }}>{text}</label>
  );
}

const inputStyle = {
  width: "100%", padding: ".75rem 1rem",
  background: "color-mix(in srgb, var(--light-bg) 92%, transparent)", border: "1.5px solid color-mix(in srgb, var(--color-primary-light) 24%, transparent)",
  borderRadius: 8, color: "var(--charcoal)", outline: "none",
  fontSize: ".9rem", transition: "border-color .2s, box-shadow .2s",
};

export default function ContactClient({ locale, c }: { locale: string; c: Content }) {
  const isAm = locale === "am";
  const heroImage = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1600&auto=format&fit=crop";
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ first: "", last: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--light-bg) 96%, transparent), color-mix(in srgb, var(--color-bg-end) 8%, transparent))" }}>
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

      <section style={{ padding: "5rem 2.5rem" }}>
        <div className="contact-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

          {/* Form */}
          <Reveal direction="left">
            <div style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--color-accent-bright) 14%, transparent), color-mix(in srgb, var(--color-primary-light) 10%, transparent))", borderRadius: 20, padding: "2.5rem", border: "1px solid color-mix(in srgb, var(--color-primary-light) 16%, transparent)", boxShadow: "0 18px 40px color-mix(in srgb, var(--charcoal) 8%, transparent)" }}>
              <h2 className={clsx("font-serif font-semibold mb-6", isAm && "font-ethiopic")}
                style={{ fontSize: "1.6rem", color: "#000000", fontWeight: "bold" }}>{c.formTitle}</h2>

              {sent ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                  <p className={clsx("font-serif font-semibold", isAm && "font-ethiopic")}
                    style={{ fontSize: "1.2rem", color: "var(--charcoal)" }}>
                    {isAm ? "መልእክትዎ ተልኳል!" : "Message sent successfully!"}
                  </p>
                  <p className={clsx("mt-2", isAm ? "font-ethiopic text-[.82rem]" : "font-sans text-[.84rem]")}
                    style={{ color: "color-mix(in srgb, var(--muted) 65%, transparent)" }}>
                    {isAm ? "በቅርብ ጊዜ ውስጥ እናቀርብሎታለን።" : "We will get back to you shortly."}
                  </p>
                  <button onClick={() => setSent(false)}
                    className={clsx("mt-5", isAm ? "font-ethiopic text-[.8rem]" : "font-sans text-[.7rem] uppercase tracking-[.1em]")}
                    style={{ color: "var(--charcoal)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                    {isAm ? "ሌላ ይላኩ" : "Send another"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Name row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.2rem" }}>
                    <div>
                      <Label text={c.firstName} isAm={isAm} />
                      <input value={form.first} onChange={e => setForm({ ...form, first: e.target.value })}
                        style={{ ...inputStyle }} required
                        onFocus={e => { e.target.style.borderColor = "var(--color-primary-light)"; e.target.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--color-accent-bright) 14%, transparent)"; }}
                        onBlur={e => { e.target.style.borderColor = "color-mix(in srgb, var(--color-primary-light) 24%, transparent)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                    <div>
                      <Label text={c.lastName} isAm={isAm} />
                      <input value={form.last} onChange={e => setForm({ ...form, last: e.target.value })}
                        style={{ ...inputStyle }} required
                        onFocus={e => { e.target.style.borderColor = "var(--color-primary-light)"; e.target.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--color-accent-bright) 14%, transparent)"; }}
                        onBlur={e => { e.target.style.borderColor = "color-mix(in srgb, var(--color-primary-light) 24%, transparent)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  {[
                    { key: "email", label: c.emailLabel, type: "email", field: "email" as const },
                    { key: "phone", label: c.phoneLabel, type: "tel",   field: "phone" as const },
                  ].map(({ key, label, type, field }) => (
                    <div key={key} style={{ marginBottom: "1.2rem" }}>
                      <Label text={label} isAm={isAm} />
                      <input type={type} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
                        style={{ ...inputStyle }}
                        onFocus={e => { e.target.style.borderColor = "var(--color-primary-light)"; e.target.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--color-accent-bright) 14%, transparent)"; }}
                        onBlur={e => { e.target.style.borderColor = "color-mix(in srgb, var(--color-primary-light) 24%, transparent)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  ))}

                  {/* Subject */}
                  <div style={{ marginBottom: "1.2rem" }}>
                    <Label text={c.subject} isAm={isAm} />
                    <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                      style={{ ...inputStyle }} required
                      onFocus={e => { e.target.style.borderColor = "var(--color-primary-light)"; e.target.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--color-accent-bright) 14%, transparent)"; }}
                      onBlur={e => { e.target.style.borderColor = "color-mix(in srgb, var(--color-primary-light) 24%, transparent)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: "1.8rem" }}>
                    <Label text={c.message} isAm={isAm} />
                    <textarea
                      value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder={c.placeholder} rows={4} required
                      className={clsx(isAm ? "font-ethiopic text-[.86rem]" : "")}
                      style={{ ...inputStyle, resize: "vertical" as const, fontFamily: "inherit" }}
                      onFocus={e => { e.target.style.borderColor = "var(--color-primary-light)"; e.target.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--color-accent-bright) 14%, transparent)"; }}
                      onBlur={e => { e.target.style.borderColor = "color-mix(in srgb, var(--color-primary-light) 24%, transparent)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  <button type="submit"
                    className={clsx(isAm ? "font-ethiopic text-[.9rem]" : "font-sans text-[.8rem] uppercase tracking-[.12em]")}
                    style={{ width: "100%", padding: "1rem", borderRadius: 10, background: "#d6ff00", color: "#17351f", border: "none", cursor: "pointer", fontWeight: 700, boxShadow: "0 4px 24px rgba(166,255,77,0.35)", transition: "all .25s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#a6ff4d"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#d6ff00"; e.currentTarget.style.transform = "none"; }}>
                    {c.submit} →
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Info panel */}
          <Reveal direction="right">
            <div>
              {/* Contact details */}
              <h2 className={clsx("font-serif font-semibold mb-6", isAm && "font-ethiopic")}
                style={{ fontSize: "1.6rem", color: "var(--charcoal)" }}>{c.infoTitle}</h2>

              {[
                { icon: "📍", text: c.address },
                { icon: "📞", text: c.phone },
                { icon: "✉",  text: c.email },
                { icon: "📱", text: c.social },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: ".9rem", marginBottom: "1.2rem" }}>
                  <span style={{ fontSize: "1.1rem", opacity: .65, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                  <p className={clsx(isAm ? "font-ethiopic text-[.86rem]" : "font-sans text-[.9rem]")}
                    style={{ color: "color-mix(in srgb, var(--muted) 76%, transparent)", lineHeight: 1.6 }}>{item.text}</p>
                </div>
              ))}

              {/* Divider */}
              <div style={{ height: 1, background: "color-mix(in srgb, var(--color-primary-light) 14%, transparent)", margin: "2rem 0" }} />

              {/* Office hours */}
              <h3 className={clsx("font-serif font-semibold mb-4", isAm && "font-ethiopic")}
                style={{ fontSize: "1.1rem", color: "var(--charcoal)" }}>{c.hoursTitle}</h3>
              {[c.hoursWeekday, c.hoursSaturday, c.hoursSunday].map((h, i) => (
                <p key={i} className={clsx(isAm ? "font-ethiopic text-[.8rem]" : "font-sans text-[.84rem]")}
                  style={{ color: "color-mix(in srgb, var(--muted) 68%, transparent)", marginBottom: ".5rem", lineHeight: 1.5 }}>{h}</p>
              ))}

              {/* Divider */}
              <div style={{ height: 1, background: "color-mix(in srgb, var(--color-primary-light) 14%, transparent)", margin: "2rem 0" }} />

              {/* SVG Map */}
              <h3 className={clsx("font-serif font-semibold mb-4", isAm && "font-ethiopic")}
                style={{ fontSize: "1.1rem", color: "var(--charcoal)" }}>{c.mapTitle}</h3>
              <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 24px color-mix(in srgb, var(--charcoal) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--color-primary-light) 15%, transparent)" }}>
                <svg viewBox="0 0 320 200" style={{ width: "100%", background: "linear-gradient(135deg, var(--charcoal), var(--color-primary), var(--charcoal))", display: "block" }}>
                  {/* Ethiopia outline (simplified) */}
                  <path d="M120 40 Q155 30 185 50 Q210 65 215 90 Q220 115 205 140 Q190 165 165 170 Q140 175 115 160 Q90 145 85 120 Q80 95 90 70 Z" fill="color-mix(in srgb, var(--color-accent-bright) 8%, transparent)" stroke="color-mix(in srgb, var(--color-accent-bright) 18%, transparent)" strokeWidth="1" />
                  {/* Roads (decorative lines) */}
                  <line x1="155" y1="100" x2="220" y2="80" stroke="color-mix(in srgb, var(--color-accent-bright) 15%, transparent)" strokeWidth=".8" strokeDasharray="3 2" />
                  <line x1="155" y1="100" x2="100" y2="140" stroke="color-mix(in srgb, var(--color-accent-bright) 15%, transparent)" strokeWidth=".8" strokeDasharray="3 2" />
                  <line x1="155" y1="100" x2="170" y2="160" stroke="color-mix(in srgb, var(--color-accent-bright) 15%, transparent)" strokeWidth=".8" strokeDasharray="3 2" />
                  {/* Pin marker */}
                  <circle cx="155" cy="100" r="12" fill="color-mix(in srgb, var(--color-accent-bright) 12%, transparent)" />
                  <circle cx="155" cy="100" r="7" fill="color-mix(in srgb, var(--color-accent-bright) 25%, transparent)" />
                  <circle cx="155" cy="100" r="4" fill="var(--color-accent-bright)" />
                  <circle cx="155" cy="100" r="1.5" fill="var(--light-bg)" opacity=".8" />
                  {/* Label */}
                  <rect x="125" y="112" width="60" height="14" rx="3" fill="color-mix(in srgb, var(--charcoal) 75%, transparent)" />
                  <text x="155" y="122.5" textAnchor="middle" fontSize="6" fill="var(--color-accent-bright)" fontFamily="DM Sans, sans-serif">Bole, Addis Ababa</text>
                </svg>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mobile: stack to single column */}
      <style>{`@media(max-width:768px){
        .contact-grid{grid-template-columns:1fr !important}
      }`}</style>
    </div>
  );
}
