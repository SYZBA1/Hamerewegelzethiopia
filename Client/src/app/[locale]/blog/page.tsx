import { getTranslations } from "next-intl/server";
import { LanguageProvider } from "@/context/LanguageContext";
import LocaleFadeWrapper from "@/components/LocaleFadeWrapper";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HomeFooter from "@/components/home/Footer";
import BlogClient from "@/components/BlogClient";
import type { Locale } from "@/context/LanguageContext";

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'am' }
  ];
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> | { locale: string } }) {
  const { locale } = await Promise.resolve(params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "blog" });
  const c = {
    heroTag: t("hero_tag"), heroTitle: t("hero_title"), heroSub: t("hero_sub"),
    newsTitle: t("news_title"), articlesTitle: t("articles_title"),
    teachingsTitle: t("teachings_title"), readMore: t("read_more"), minRead: t("min_read"),
    posts: ([1,2,3,4,5,6] as const).map(i => ({
      slug: `p${i}`,
      title: t(`p${i}_title` as any), cat: t(`p${i}_cat` as any),
      date: t(`p${i}_date` as any), readMin: t(`p${i}_read` as any),
      excerpt: t(`p${i}_excerpt` as any),
    })),
  };
  return (
    <LanguageProvider initialLocale={locale}>
      <ScrollProgress /><Navbar />
      <LocaleFadeWrapper><main><BlogClient locale={locale} c={c} /></main><HomeFooter locale={locale} /></LocaleFadeWrapper>
    </LanguageProvider>
  );
}