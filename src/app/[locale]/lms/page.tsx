import { getTranslations } from "next-intl/server";
import { LanguageProvider } from "@/context/LanguageContext";
import LocaleFadeWrapper from "@/components/LocaleFadeWrapper";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import LMSClient from "@/components/LMSClient";
import type { Locale } from "@/context/LanguageContext";

export default async function LMSPage({ params }: { params: Promise<{ locale: string }> | { locale: string } }) {
  const { locale } = await Promise.resolve(params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "lms" });
  const c = {
    heroTag: t("hero_tag"), heroTitle: t("hero_title"), heroSub: t("hero_sub"),
    studentLabel: t("student_label"), teacherLabel: t("teacher_label"), adminLabel: t("admin_label"),
    emailLabel: t("email_label"), passwordLabel: t("password_label"),
    loginBtn: t("login_btn"), forgot: t("forgot"),
    registerPrompt: t("register_prompt"), registerLink: t("register_link"),
    featuresTitle: t("features_title"),
    features: [t("f1"), t("f2"), t("f3"), t("f4"), t("f5"), t("f6")],
  };
  return (
    <LanguageProvider initialLocale={locale}>
      <ScrollProgress /><Navbar />
      <LocaleFadeWrapper><main className="pt-20"><LMSClient locale={locale} c={c} /></main><Footer /></LocaleFadeWrapper>
    </LanguageProvider>
  );
}