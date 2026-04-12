"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import MegaMenu from "./MegaMenu";
import LanguageToggle from "./LanguageToggle";
import clsx from "clsx";

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.22 }}
      className="w-2.5 h-2.5 ml-0.5 opacity-55"
      viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth={1.6}
    ><path d="M1 1l4 4 4-4" /></motion.svg>
  );
}

function NavLink({
  href, children, hasDropdown, isOpen, onHover, onLeave, isActive,
}: {
  href: string; children: React.ReactNode; hasDropdown?: boolean;
  isOpen?: boolean; onHover?: () => void; onLeave?: () => void; isActive?: boolean;
}) {
  const { lang } = useLang();
  return (
    <Link
      href={href}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={clsx(
        "relative flex items-center gap-1 px-3 py-2 rounded-md transition-colors duration-200",
        isActive ? "text-sage" : "text-mist/65 hover:text-sage hover:bg-sage/[0.07]",
        lang === "am" ? "font-ethiopic text-[0.82rem]" : "font-sans text-[0.72rem] uppercase tracking-[0.09em]"
      )}
    >
      {children}
      {hasDropdown && <Chevron open={!!isOpen} />}
      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="absolute bottom-0 left-3 right-3 h-[1.5px] rounded-full bg-gold"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

export default function Navbar() {
  const { lang } = useLang();
  const t = translations[lang].nav;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const deptTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const openDept  = () => { clearTimeout(deptTimer.current); setDeptOpen(true); };
  const closeDept = () => { deptTimer.current = setTimeout(() => setDeptOpen(false), 130); };

  const base = `/${lang}`;
  const h = (path: string) => (path === "/" ? base : `${base}${path}`);
  const is = (path: string) =>
    path === "/" ? pathname === base || pathname === base + "/"
    : pathname.startsWith(base + path);

  const mainLinks = [
    { key: "home",        path: "/" },
    { key: "about",       path: "/about" },
    { key: "sermons",     path: "/sermons" },
    { key: "blog",        path: "/blog" },
    { key: "library",     path: "/library" },
    { key: "contact",     path: "/contact" },
  ];

  const mobileLinks = [
    ...mainLinks,
    { key: "departments", path: "/departments" },
    { key: "lms",         path: "/lms/login" },
    { key: "donate",      path: "/donate" },
  ];

  return (
    <nav className={clsx(
      "fixed top-0 inset-x-0 z-50 transition-all duration-400",
      scrolled ? "glass shadow-xl shadow-black/30" : "bg-transparent"
    )}>
      <div className="flex items-center justify-between px-8 lg:px-10 py-4 max-w-[1440px] mx-auto">

        {/* Logo */}
        <Link href={h("/")} className="flex flex-col flex-shrink-0 group" aria-label="Hamere Wengel Zethiopia">
          <span className="font-serif text-[1.05rem] text-sage leading-none tracking-wide group-hover:text-mist transition-colors">
            Hamere Wengel
          </span>
          <span className="text-[0.52rem] uppercase tracking-[0.2em] text-gold/85 mt-0.5">
            Zethiopia Ministry
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-0.5 list-none">
          {mainLinks.slice(0, 2).map(({ key, path }) => (
            <li key={key}>
              <NavLink href={h(path)} isActive={is(path)}>{t[key as keyof typeof t]}</NavLink>
            </li>
          ))}

          {/* Departments dropdown */}
          <li className="relative" onMouseEnter={openDept} onMouseLeave={closeDept}>
            <NavLink href={h("/departments")} hasDropdown isOpen={deptOpen}
              isActive={is("/departments")} onHover={openDept} onLeave={closeDept}>
              {t.departments}
            </NavLink>
            <MegaMenu isOpen={deptOpen} locale={lang} onMouseEnter={openDept} onMouseLeave={closeDept} />
          </li>

          {mainLinks.slice(2).map(({ key, path }) => (
            <li key={key}>
              <NavLink href={h(path)} isActive={is(path)}>{t[key as keyof typeof t]}</NavLink>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link href={h("/lms/login")} className={clsx(
            "hidden sm:block px-4 py-2 rounded-sm border border-sage/40 text-sage",
            "transition-all duration-250 hover:bg-sage hover:text-deep",
            lang === "am" ? "font-ethiopic text-[0.78rem]" : "font-sans text-[0.72rem] uppercase tracking-[0.1em]"
          )}>{t.lms}</Link>

          <Link href={h("/donate")} className={clsx(
            "px-4 py-2 rounded-sm bg-crimson text-white font-semibold",
            "animate-pulse-red transition-all duration-250",
            "hover:bg-crimson-glow hover:shadow-[0_0_30px_rgba(231,76,60,.6)]",
            lang === "am" ? "font-ethiopic text-[0.78rem]" : "font-sans text-[0.72rem] uppercase tracking-[0.1em]"
          )}>{t.donate}</Link>

          <LanguageToggle />

          <button
            className="lg:hidden ml-1 p-2 rounded-md text-sage/70 hover:text-sage hover:bg-sage/10 transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle navigation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden glass border-t border-sage/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {mobileLinks.map(({ key, path }) => (
                <Link key={key} href={h(path)} className={clsx(
                  "px-3 py-2.5 rounded-md transition-colors",
                  "text-mist/70 hover:text-sage hover:bg-sage/[0.07]",
                  lang === "am" ? "font-ethiopic text-[0.88rem]" : "font-sans text-[0.75rem] uppercase tracking-[0.1em]"
                )}>{t[key as keyof typeof t]}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
