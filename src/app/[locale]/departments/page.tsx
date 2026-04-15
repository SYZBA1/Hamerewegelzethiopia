import { getTranslations } from "next-intl/server";
import { LanguageProvider } from "@/context/LanguageContext";
import LocaleFadeWrapper from "@/components/LocaleFadeWrapper";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import DepartmentsClient from "@/components/DepartmentsClient";
import type { Locale } from "@/context/LanguageContext";

export default async function DepartmentsPage({ params }: { params: Promise<{ locale: string }> | { locale: string } }) {
  const { locale } = await Promise.resolve(params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "departments" });
  const c = {
    heroTag: t("hero_tag"), heroTitle: t("hero_title"), heroSub: t("hero_sub"),
    ministriesTitle: t("ministries_title"), educationTitle: t("education_title"),
    branchesTitle: t("branches_title"), explore: t("explore"),
    ministries: [
      { icon: "📡", title: t("m1_title"), desc: t("m1_desc") },
      { icon: "📖", title: t("m2_title"), desc: t("m2_desc") },
      { icon: "🤝", title: t("m3_title"), desc: t("m3_desc") },
    ],
    eduProgs: [
      { title: t("e1_title"), duration: t("e1_duration"), badge: "1–2 yr" },
      { title: t("e2_title"), duration: t("e2_duration"), badge: "4 yr" },
      { title: t("e3_title"), duration: t("e3_duration"), badge: "2 yr" },
    ],
    branches: ([1,2,3,4,5,6] as const).map(i => ({
      name: t(`b${i}_name` as any), loc: t(`b${i}_loc` as any), detail: t(`b${i}_detail` as any),
    })),
  };
  return (
    <LanguageProvider initialLocale={locale}>
      <ScrollProgress /><Navbar />
      <LocaleFadeWrapper><main className="pt-20"><DepartmentsClient locale={locale} c={c} /></main><Footer /></LocaleFadeWrapper>
    </LanguageProvider>
  );
}