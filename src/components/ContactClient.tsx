"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { Reveal, PageHero } from "@/components/PageComponents";
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
      style={{ color: "rgba(5,31,32,.55)" }}>{text}</label>
  );
}

const inputStyle = {
  width: "100%", padding: ".75rem 1rem",
  background: "#fff", border: "1.5px solid rgba(35,83,71,.2)",
  borderRadius: 8, color: "#051F20", outline: "none",
  fontSize: ".9rem", transition: "border-color .2s, box-shadow .2s",
};

export default function ContactClient({ locale, c }: { locale: string; c: Content }) {
  const isAm = locale === "am";
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ first: "", last: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ background: "#ffffff" }}>
      <PageHero tag={c.heroTag} title={c.heroTitle} sub={c.heroSub} />

      <section style={{ padding: "5rem 2.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

          {/* Form */}
          <Reveal direction="left">
            <div style={{ background: "#E8F5E9", borderRadius: 20, padding: "2.5rem" }}>
              <h2 className={clsx("font-serif font-semibold mb-6", isAm && "font-ethiopic")}
                style={{ fontSize: "1.6rem", color: "#051F20" }}>{c.formTitle}</h2>

              {sent ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                  <p className={clsx("font-serif font-semibold", isAm && "font-ethiopic")}
                    style={{ fontSize: "1.2rem", color: "#235347" }}>
                    {isAm ? "መልእክትዎ ተልኳል!" : "Message sent successfully!"}
                  </p>
                  <p className={clsx("mt-2", isAm ? "font-ethiopic text-[.82rem]" : "font-sans text-[.84rem]")}
                    style={{ color: "rgba(5,31,32,.55)" }}>
                    {isAm ? "በቅርብ ጊዜ ውስጥ እናቀርብሎታለን።" : "We will get back to you shortly."}
                  </p>
                  <button onClick={() => setSent(false)}
                    className={clsx("mt-5", isAm ? "font-ethiopic text-[.8rem]" : "font-sans text-[.7rem] uppercase tracking-[.1em]")}
                    style={{ color: "#235347", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
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
                        onFocus={e => { e.target.style.borderColor = "#235347"; e.target.style.boxShadow = "0 0 0 3px rgba(35,83,71,.1)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(35,83,71,.2)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                    <div>
                      <Label text={c.lastName} isAm={isAm} />
                      <input value={form.last} onChange={e => setForm({ ...form, last: e.target.value })}
                        style={{ ...inputStyle }} required
                        onFocus={e => { e.target.style.borderColor = "#235347"; e.target.style.boxShadow = "0 0 0 3px rgba(35,83,71,.1)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(35,83,71,.2)"; e.target.style.boxShadow = "none"; }}
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
                        onFocus={e => { e.target.style.borderColor = "#235347"; e.target.style.boxShadow = "0 0 0 3px rgba(35,83,71,.1)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(35,83,71,.2)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  ))}

                  {/* Subject */}
                  <div style={{ marginBottom: "1.2rem" }}>
                    <Label text={c.subject} isAm={isAm} />
                    <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                      style={{ ...inputStyle }} required
                      onFocus={e => { e.target.style.borderColor = "#235347"; e.target.style.boxShadow = "0 0 0 3px rgba(35,83,71,.1)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(35,83,71,.2)"; e.target.style.boxShadow = "none"; }}
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
                      onFocus={e => { e.target.style.borderColor = "#235347"; e.target.style.boxShadow = "0 0 0 3px rgba(35,83,71,.1)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(35,83,71,.2)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  <button type="submit"
                    className={clsx(isAm ? "font-ethiopic text-[.9rem]" : "font-sans text-[.8rem] uppercase tracking-[.12em]")}
                    style={{ width: "100%", padding: "1rem", borderRadius: 10, background: "#235347", color: "#DAF1DE", border: "none", cursor: "pointer", fontWeight: 700, boxShadow: "0 4px 24px rgba(35,83,71,.3)", transition: "all .25s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#163832"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#235347"; e.currentTarget.style.transform = "none"; }}>
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
                style={{ fontSize: "1.6rem", color: "#051F20" }}>{c.infoTitle}</h2>

              {[
                { icon: "📍", text: c.address },
                { icon: "📞", text: c.phone },
                { icon: "✉",  text: c.email },
                { icon: "📱", text: c.social },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: ".9rem", marginBottom: "1.2rem" }}>
                  <span style={{ fontSize: "1.1rem", opacity: .65, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                  <p className={clsx(isAm ? "font-ethiopic text-[.86rem]" : "font-sans text-[.9rem]")}
                    style={{ color: "rgba(5,31,32,.7)", lineHeight: 1.6 }}>{item.text}</p>
                </div>
              ))}

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(35,83,71,.1)", margin: "2rem 0" }} />

              {/* Office hours */}
              <h3 className={clsx("font-serif font-semibold mb-4", isAm && "font-ethiopic")}
                style={{ fontSize: "1.1rem", color: "#051F20" }}>{c.hoursTitle}</h3>
              {[c.hoursWeekday, c.hoursSaturday, c.hoursSunday].map((h, i) => (
                <p key={i} className={clsx(isAm ? "font-ethiopic text-[.8rem]" : "font-sans text-[.84rem]")}
                  style={{ color: "rgba(5,31,32,.6)", marginBottom: ".5rem", lineHeight: 1.5 }}>{h}</p>
              ))}

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(35,83,71,.1)", margin: "2rem 0" }} />

              {/* SVG Map */}
              <h3 className={clsx("font-serif font-semibold mb-4", isAm && "font-ethiopic")}
                style={{ fontSize: "1.1rem", color: "#051F20" }}>{c.mapTitle}</h3>
              <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.12)", border: "1px solid rgba(35,83,71,.15)" }}>
                <svg viewBox="0 0 320 200" style={{ width: "100%", background: "linear-gradient(135deg, #163832, #0B2B26, #051F20)", display: "block" }}>
                  {/* Ethiopia outline (simplified) */}
                  <path d="M120 40 Q155 30 185 50 Q210 65 215 90 Q220 115 205 140 Q190 165 165 170 Q140 175 115 160 Q90 145 85 120 Q80 95 90 70 Z" fill="rgba(142,182,155,.08)" stroke="rgba(142,182,155,.18)" strokeWidth="1" />
                  {/* Roads (decorative lines) */}
                  <line x1="155" y1="100" x2="220" y2="80" stroke="rgba(201,169,110,.15)" strokeWidth=".8" strokeDasharray="3 2" />
                  <line x1="155" y1="100" x2="100" y2="140" stroke="rgba(201,169,110,.15)" strokeWidth=".8" strokeDasharray="3 2" />
                  <line x1="155" y1="100" x2="170" y2="160" stroke="rgba(201,169,110,.15)" strokeWidth=".8" strokeDasharray="3 2" />
                  {/* Pin marker */}
                  <circle cx="155" cy="100" r="12" fill="rgba(201,169,110,.12)" />
                  <circle cx="155" cy="100" r="7" fill="rgba(201,169,110,.25)" />
                  <circle cx="155" cy="100" r="4" fill="#C9A96E" />
                  <circle cx="155" cy="100" r="1.5" fill="#fff" opacity=".8" />
                  {/* Label */}
                  <rect x="125" y="112" width="60" height="14" rx="3" fill="rgba(5,31,32,.75)" />
                  <text x="155" y="122.5" textAnchor="middle" fontSize="6" fill="#8EB69B" fontFamily="DM Sans, sans-serif">Bole, Addis Ababa</text>
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
