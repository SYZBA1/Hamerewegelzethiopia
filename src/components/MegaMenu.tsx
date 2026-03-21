"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import clsx from "clsx";

const menuVariants = {
  hidden:  { opacity: 0, y: -10, clipPath: "inset(0 0 100% 0 round 10px)" },
  visible: { opacity: 1, y: 0,   clipPath: "inset(0 0 0% 0 round 10px)",
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.04, delayChildren: 0.06 } },
  exit:    { opacity: 0, y: -8,  clipPath: "inset(0 0 100% 0 round 10px)",
    transition: { duration: 0.2, ease: "easeIn" } },
};
const colV = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.28 } } };
const itemV = { hidden: { opacity: 0, x: -5 }, visible: { opacity: 1, x: 0, transition: { duration: 0.2 } } };

function Badge({ label }: { label: string }) {
  return (
    <span className="ml-auto text-[0.5rem] font-bold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-full bg-mint/15 text-sage border border-sage/20 flex-shrink-0">
      {label}
    </span>
  );
}

function ColHead({ title, sub }: { title: string; sub: string }) {
  const { lang } = useLang();
  return (
    <div className="pb-2.5 mb-1.5 border-b border-sage/10">
      <p className={clsx("font-semibold text-sage leading-none",
        lang === "am" ? "font-ethiopic text-[0.8rem]" : "font-sans text-[0.68rem] uppercase tracking-[0.18em]")}> 
        {title}
      </p>
      <p className="font-sans text-[0.56rem] text-mist/38 uppercase tracking-[0.12em] mt-1">{sub}</p>
    </div>
  );
}

function Item({ href, icon, label, badge }: { href: string; icon: string; label: string; badge?: string }) {
  const { lang } = useLang();
  return (
    <motion.div variants={itemV}>
      <Link href={href} className={clsx(
        "group flex items-center gap-2.5 px-2.5 py-[0.48rem] rounded-lg",
        "text-mist/60 hover:text-mint hover:bg-sage/[0.09] hover:translate-x-0.5",
        "transition-all duration-200",
        lang === "am" ? "font-ethiopic text-[0.8rem] leading-relaxed" : "font-sans text-[0.76rem]"
      )}>
        <span className="text-[0.85rem] opacity-50 group-hover:opacity-90 transition-opacity w-5 text-center flex-shrink-0">{icon}</span>
        <span className="flex-1">{label}</span>
        {badge && <Badge label={badge} />}
      </Link>
    </motion.div>
  );
}

export default function MegaMenu({ isOpen, locale, onMouseEnter, onMouseLeave }: {
  isOpen: boolean; locale: string; onMouseEnter?: () => void; onMouseLeave?: () => void;
}) {
  const { lang } = useLang();
  const t = translations[lang].mega;
  const base = `/${locale}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mega"
          role="region"
          aria-label="Departments menu"
          variants={menuVariants}
          initial="hidden" animate="visible" exit="exit"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={clsx(
            "glass absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2",
            "w-[750px] max-w-[95vw] rounded-xl z-50",
            "shadow-[0_24px_60px_rgba(0,0,0,.55),0_0_0_1px_rgba(142,182,155,.07)]",
            "p-5 grid grid-cols-3 gap-1 relative"
          )}
        >
          <div className="absolute top-5 bottom-5 left-[33.33%] w-px bg-sage/10" />
          <div className="absolute top-5 bottom-5 left-[66.66%] w-px bg-sage/10" />

          {/* Col 1 — Central Departments */}
          <motion.div variants={colV} className="flex flex-col gap-0.5 pr-4">
            <ColHead title={t.hq_title} sub="General Secretariat" />
            <Item href={`${base}/departments`} icon="📡" label={t.dept.media} />
            <Item href={`${base}/departments`} icon="💰" label={t.dept.finance} />
            <Item href={`${base}/departments`} icon="🔬" label={t.dept.research} />
            <Item href={`${base}/departments`} icon="🎓" label={t.dept.education} />
            <Item href={`${base}/departments`} icon="🌱" label={t.dept.relief} />
            <Item href={`${base}/departments`} icon="✝"  label={t.dept.gospel} />
            <Link href={`${base}/departments`}
              className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-sage/10 font-sans text-[0.64rem] uppercase tracking-[0.12em] text-sage/55 hover:text-sage transition-colors">
              ☰ {t.viewAll} →
            </Link>
          </motion.div>

          {/* Col 2 — Education */}
          <motion.div variants={colV} className="flex flex-col gap-0.5 px-4">
            <ColHead title={t.edu_title} sub="Education Programs" />
            <Item href={`${base}/departments`} icon="📜" label={t.edu.diploma}  badge="1–2yr" />
            <Item href={`${base}/departments`} icon="🎓" label={t.edu.degree}   badge="4yr"   />
            <Item href={`${base}/departments`} icon="🏛" label={t.edu.masters}  badge="2yr"   />
            <Item href={`${base}/library`}     icon="📚" label={t.edu.library}               />
          </motion.div>

          {/* Col 3 — Locations */}
          <motion.div variants={colV} className="flex flex-col gap-0.5 pl-4">
            <ColHead title={t.loc_title} sub="Administrative Structure" />
            <Item href={`${base}/departments`} icon="⛪" label={t.loc.diocese}  badge="Diocese" />
            <Item href={`${base}/departments`} icon="🗺" label={t.loc.zone}     badge="Zone"    />
            <Item href={`${base}/departments`} icon="📍" label={t.loc.district} badge="Wereda"  />
            <div className="mt-3 p-2.5 rounded-lg bg-sage/[0.05] border border-sage/10">
              <p className={clsx("text-mist/42 leading-relaxed",
                lang === "am" ? "font-ethiopic text-[0.7rem]" : "font-sans text-[0.64rem]")}>
                {t.structureDesc}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
