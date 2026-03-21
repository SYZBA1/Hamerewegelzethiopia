import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";

export const metadata: Metadata = {
  title: "Hamere Wengel Zethiopia | ሐመረ ወንጌል ዘኢትዮጵያ",
  description: "Living by Faith, known by Love, and a voice of Hope",
};

const locales = ["am", "en"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  // Support both Next.js 14 and 15 params handling
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;

  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&family=Noto+Serif+Ethiopic:wght@300;400;600&display=swap"
        />
      </head>
      <body style={{ margin: 0, background: "#051F20", color: "#DAF1DE" }}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
