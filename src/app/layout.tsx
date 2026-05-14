import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Noto_Serif_Ethiopic } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

const notoSerifEthiopic = Noto_Serif_Ethiopic({
  subsets: ["ethiopic"],
  weight: ["300", "400", "600"],
  variable: "--font-ethiopic",
});

export const metadata: Metadata = {
  title: "Hamere Wengel Zethiopia | ሐመረ ወንጌል ዘኢትዮጵያ",
  description: "Living by Faith, known by Love, and a voice of Hope",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`theme-light ${cormorant.variable} ${dmSans.variable} ${notoSerifEthiopic.variable}`}>
        {children}
      </body>
    </html>
  );
}
