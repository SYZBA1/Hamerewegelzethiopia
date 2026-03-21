import { getTranslations } from "next-intl/server";
import { LanguageProvider } from "@/context/LanguageContext";
import LocaleFadeWrapper from "@/components/LocaleFadeWrapper";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import ZSectionsContainer from "@/components/ZSectionsContainer";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import type { Locale } from "@/context/LanguageContext";

async function StatsBar({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "stats" });
  const stats = [
    { num: "48+",    key: "branches" },
    { num: "12",     key: "colleges" },
    { num: "3,400+", key: "students" },
    { num: "500+",   key: "sermons"  },
    { num: "25K+",   key: "members"  },
  ] as const;
  return (
    <div style={{ background:"#0B2B26", borderTop:"1px solid rgba(142,182,155,.08)", borderBottom:"1px solid rgba(142,182,155,.08)", display:"flex", flexWrap:"wrap", justifyContent:"center" }}>
      {stats.map(({ num, key }) => (
        <div key={key} style={{ flex:"1", minWidth:"130px", padding:"1.8rem 1rem", textAlign:"center", borderRight:"1px solid rgba(142,182,155,.08)" }}>
          <div style={{ fontFamily:"Cormorant Garamond,serif", fontSize:"2.2rem", fontWeight:600, color:"#8EB69B", lineHeight:1 }}>{num}</div>
          <div style={{ fontSize:"0.62rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(218,241,222,.45)", marginTop:"0.4rem", fontFamily: locale==="am" ? "Noto Serif Ethiopic,serif" : "DM Sans,sans-serif" }}>{t(key)}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> | { locale: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale as Locale;
  return (
    <LanguageProvider initialLocale={locale}>
      <ScrollProgress />
      <Navbar />
      <LocaleFadeWrapper>
        <main>
          <HeroSection />
          <StatsBar locale={locale} />
          <div style={{ height:"80px", background:"linear-gradient(to bottom, #0B2B26, #ffffff)" }} />
          <ZSectionsContainer locale={locale} />
          <MissionSection />
        </main>
        <Footer />
      </LocaleFadeWrapper>
    </LanguageProvider>
  );
}
