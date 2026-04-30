import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { LanguageProvider } from "@/context/LanguageContext";
import LocaleFadeWrapper from "@/components/LocaleFadeWrapper";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HomeFooter from "@/components/home/Footer";
import { getResourceBySlug } from "@/lib/libraryResources";
import type { Locale } from "@/context/LanguageContext";

export default async function LibraryBookPage({ params }: { params: Promise<{ locale: string; slug: string }> | { locale: string; slug: string } }) {
  const { locale, slug } = await Promise.resolve(params) as { locale: Locale; slug: string };
  const t = await getTranslations({ locale, namespace: "library" });
  const resource = getResourceBySlug(slug);

  if (!resource) {
    redirect(`/${locale}/library`);
  }

  const backLabel = locale === "am" ? "ተመለስ" : "Back to Library";
  const readerLabel = locale === "am" ? "አሁን ይይዙ" : "Read Now";

  return (
    <LanguageProvider initialLocale={locale}>
      <ScrollProgress />
      <Navbar />
      <LocaleFadeWrapper>
        <main className="pt-20 pb-20 px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Link
                href={`/${locale}/library`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-deep transition"
              >
                ← {backLabel}
              </Link>
            </div>

            <div className="rounded-3xl bg-[#111] border border-forest/15 p-8 shadow-[0_20px_80px_rgba(0,0,0,.25)]">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-forest text-[0.78rem] uppercase tracking-[0.2em] font-sans mb-3">{resource.type}</p>
                  <h1 className="font-serif text-4xl font-semibold text-white mb-3 leading-tight">{resource.title}</h1>
                  <p className="text-deep/50 text-sm">{resource.meta}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <button className="rounded-full bg-forest px-5 py-3 text-sm font-semibold text-[#111] transition hover:bg-[#c0ff7f]">
                    {t("preview_btn")}
                  </button>
                  <button className="rounded-full border border-forest/20 bg-transparent px-5 py-3 text-sm font-semibold text-forest transition hover:border-forest/40">
                    {t("download_btn")}
                  </button>
                  {resource.price ? (
                    <button className="rounded-full bg-[#d6ff00] px-5 py-3 text-sm font-semibold text-[#111] transition hover:bg-[#c0ff7f]">
                      {resource.price}
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-forest/10 bg-[#0d0d0d] p-8">
                <h2 className="font-serif text-2xl font-semibold text-white mb-4">{locale === "am" ? "የመጽሐፍ መረጃ" : "Book Overview"}</h2>
                <p className="text-deep/60 leading-7">
                  {locale === "am"
                    ? `ይህ ${resource.title} ስለ ${resource.type} መረጃ እና እንዴት ማንበብ እንደሚቻል ይገልፃል። ይህንን ገፅ ተጨማሪ መጽሐፍ እና ምንጭ የሚፈልጉ ለማግኘት ይጠቀሙ።`
                    : `This page shows details for ${resource.title}. Use the buttons above to preview, download, or purchase the resource, and return to the library when you are ready.`}
                </p>
                <div className="mt-8 rounded-3xl bg-[#111] p-6 border border-forest/10">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-forest mb-2">{locale === "am" ? "አንቀጽ ዝርዝር" : "Reader Note"}</p>
                  <p className="text-deep/50 text-sm leading-7">{t("reader_note")}</p>
                  <div className="mt-6">
                    <button className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-[#111] transition hover:bg-[#c0ff7f]">
                      {readerLabel}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </LocaleFadeWrapper>
      <HomeFooter locale={locale} />
    </LanguageProvider>
  );
}
