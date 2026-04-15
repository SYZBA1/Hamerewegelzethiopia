import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LanguageProvider } from "@/context/LanguageContext";
import LocaleFadeWrapper from "@/components/LocaleFadeWrapper";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import type { Locale } from "@/context/LanguageContext";

export default async function IntegrationPage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const { locale } = await Promise.resolve(params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "integration" });
  const base = `/${locale}`;

  const cards = [
    {
      id: "library",
      title: t("card_library_title"),
      body: t("card_library_body"),
      href: `${base}/library`,
      icon: "📚",
    },
    {
      id: "lms",
      title: t("card_lms_title"),
      body: t("card_lms_body"),
      href: `${base}/lms/login`,
      icon: "💻",
    },
    {
      id: "graduation",
      title: t("card_grad_title"),
      body: t("card_grad_body"),
      href: `${base}/contact`,
      icon: "🎓",
    },
  ] as const;

  return (
    <LanguageProvider initialLocale={locale}>
      <ScrollProgress />
      <Navbar />
      <LocaleFadeWrapper>
        <main className="min-h-screen bg-gradient-to-b from-[#E2FBCE]/30 via-[#FFFDEE]/40 to-white pt-24 pb-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#076653]">{t("eyebrow")}</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-[#0C342C] md:text-5xl">{t("title")}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-[#076653]/85">{t("subtitle")}</p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 px-4 md:grid-cols-3">
            {cards.map((c) => (
              <section
                key={c.id}
                id={c.id}
                className="flex flex-col rounded-2xl border border-white/40 bg-white/60 p-8 shadow-lg shadow-[#076653]/10 backdrop-blur-md"
              >
                <div className="text-amber-500 text-4xl">{c.icon}</div>
                <h2 className="mt-4 font-serif text-xl font-semibold text-[#0C342C]">{c.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#076653]/85">{c.body}</p>
                <Link
                  href={c.href}
                  className="btn-lumme mt-6 inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold text-[#FFFDEE] shadow-lg transition hover:brightness-110"
                >
                  {t("cta")}
                </Link>
              </section>
            ))}
          </div>
        </main>
        <Footer />
      </LocaleFadeWrapper>
    </LanguageProvider>
  );
}
