import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageContext";
import LocaleFadeWrapper from "@/components/LocaleFadeWrapper";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HomeFooter from "@/components/home/Footer";
import type { Locale } from "@/context/LanguageContext";

const BLOG_POST_SLUGS = ["p1", "p2", "p3", "p4", "p5", "p6"] as const;

// Cover images per post — admin can update these paths in the admin portal
const POST_COVER_IMAGES: Record<string, string> = {
  p1: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1200&auto=format&fit=crop",
  p2: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop",
  p3: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1200&auto=format&fit=crop",
  p4: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200&auto=format&fit=crop",
  p5: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
  p6: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1200&auto=format&fit=crop",
};

type BlogPostSlug = (typeof BLOG_POST_SLUGS)[number];

export async function generateStaticParams() {
  return BLOG_POST_SLUGS.flatMap((slug) => [
    { locale: "en", slug },
    { locale: "am", slug },
  ]);
}

function buildPostData(t: (key: string) => string, slug: BlogPostSlug) {
  const title = t(`${slug}_title` as any);
  const category = t(`${slug}_cat` as any);
  const date = t(`${slug}_date` as any);
  const readMin = t(`${slug}_read` as any);
  const excerpt = t(`${slug}_excerpt` as any);

  return {
    title,
    category,
    date,
    readMin,
    excerpt,
    body: [
      excerpt,
      t("read_more") as string,
      `${excerpt} ${excerpt}`,
    ],
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> | { locale: string; slug: string } }) {
  const { locale, slug } = await Promise.resolve(params) as { locale: Locale; slug: string };
  if (!BLOG_POST_SLUGS.includes(slug as BlogPostSlug)) {
    return notFound();
  }

  const t = await getTranslations({ locale, namespace: "blog" });
  const post = buildPostData(t, slug as BlogPostSlug);

  return (
    <LanguageProvider initialLocale={locale}>
      <ScrollProgress />
      <Navbar />
      <LocaleFadeWrapper>
        <main className="pt-20">
          <section className="max-w-5xl mx-auto px-6 pb-20">
            <div className="mb-4 text-sm uppercase tracking-[0.18em] text-[#d6ff00]">Blog</div>
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-[#f1f8d8] px-4 py-2 text-sm font-semibold text-[#425014]">{post.category}</span>
              <span className="text-sm text-slate-500">{post.date}</span>
              <span className="text-sm text-slate-500">•</span>
              <span className="text-sm text-slate-500">{post.readMin} {t("min_read")}</span>
            </div>
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#101010] sm:text-5xl">{post.title}</h1>

            {POST_COVER_IMAGES[slug] && (
              <div className="mt-8 overflow-hidden rounded-2xl">
                <Image
                  src={POST_COVER_IMAGES[slug]}
                  alt={post.title}
                  width={1000}
                  height={460}
                  className="w-full object-cover"
                  priority
                />
              </div>
            )}

            <p className="mt-8 max-w-3xl text-base leading-8 text-slate-700">{post.excerpt}</p>

            <article className="mt-10 space-y-8 text-base leading-8 text-slate-700">
              {post.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </article>

            <div className="mt-12">
              <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-[#1b3d0c] font-semibold hover:text-[#4c7b1e]">
                {locale === "am" ? "ወደ ብሎግ ተመለስ" : "Back to Blog"}
              </Link>
            </div>
          </section>
        </main>
      </LocaleFadeWrapper>
      <HomeFooter locale={locale} />
    </LanguageProvider>
  );
}
