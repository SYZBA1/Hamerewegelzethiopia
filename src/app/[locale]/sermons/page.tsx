import { getTranslations } from "next-intl/server";
import { LanguageProvider } from "@/context/LanguageContext";
import LocaleFadeWrapper from "@/components/LocaleFadeWrapper";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HomeFooter from "@/components/home/Footer";
import SermonsClient from "@/components/SermonsClient";
import type { Locale } from "@/context/LanguageContext";

export default async function SermonsPage({ params }: { params: Promise<{ locale: string }> | { locale: string } }) {
  const { locale } = await Promise.resolve(params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "sermons" });
  const c = {
    heroTag: t("hero_tag"), heroTitle: t("hero_title"), heroSub: t("hero_sub"),
    videoTitle: t("video_title"), audioTitle: t("audio_title"),
    featuredTitle: t("featured_title"), archiveTitle: t("archive_title"),
    archiveSub: t("archive_sub"), archiveBtn: t("archive_btn"),
    filters: [t("filter_all"), t("filter_am"), t("filter_en"), t("filter_recent")],
    listen: t("listen"), watch: t("watch"), download: t("download"), viewAll: t("view_all"),
    sermons: ([1,2,3,4,5,6] as const).map(i => ({
      title: t(`s${i}_title` as any), spkr: t(`s${i}_spkr` as any),
      date: t(`s${i}_date` as any), dur: t(`s${i}_dur` as any),
    })),
  };
  return (
    <LanguageProvider initialLocale={locale}>
      <ScrollProgress /><Navbar />
      <LocaleFadeWrapper><main><SermonsClient locale={locale} c={c} /></main><HomeFooter locale={locale} /></LocaleFadeWrapper>
    </LanguageProvider>
  );
}