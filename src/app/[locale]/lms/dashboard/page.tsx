import { getTranslations } from "next-intl/server";
import { LanguageProvider } from "@/context/LanguageContext";
import LocaleFadeWrapper from "@/components/LocaleFadeWrapper";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import LMSDashboardClient from "@/components/LMSDashboardClient";
import type { Locale } from "@/context/LanguageContext";

export default async function LMSDashboardPage({ params }: { params: Promise<{ locale: string }> | { locale: string } }) {
  const { locale } = await Promise.resolve(params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "lms-dashboard" });
  const c = {
    welcome: t("welcome"),
    stats: {
      enrolled: t("enrolled_courses"),
      completed: t("completed_courses"),
      pending: t("pending_assignments")
    },
    recentActivity: t("recent_activity"),
    continueLearning: t("continue_learning")
  };
  return (
    <LanguageProvider initialLocale={locale}>
      <ScrollProgress /><Navbar />
      <LocaleFadeWrapper><main className="pt-20"><LMSDashboardClient locale={locale} c={c} /></main><Footer /></LocaleFadeWrapper>
    </LanguageProvider>
  );
}