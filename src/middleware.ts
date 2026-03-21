import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["am", "en"],
  defaultLocale: "am",
  localePrefix: "always", // always show /am/ or /en/ in URL
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
