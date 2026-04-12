import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";

export const metadata: Metadata = {
  title: "Hamere Wengel Zethiopia | ሐመረ ወንጌል ዘኢትዮጵያ",
  description: "Living by Faith, known by Love, and a voice of Hope",
};

const locales = ["am", "en"] as const;
type Locale = (typeof locales)[number];
type LocaleParams = { locale: Locale };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LocaleParams;
}) {
  const locale = params.locale;

  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body style={{ margin: 0, background: "#051F20", color: "#DAF1DE" }}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
