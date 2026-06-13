import SuperAdminPlatform from "@/components/admin/SuperAdminPlatform";

export function generateStaticParams() {
  return [
    { locale: "en", section: "dashboard" },
    { locale: "en", section: "website-content" },
    { locale: "en", section: "departments" },
    { locale: "en", section: "news-articles" },
    { locale: "en", section: "events" },
    { locale: "en", section: "media-library" },
    { locale: "en", section: "sermons" },
    { locale: "en", section: "users" },
    { locale: "en", section: "donations" },
    { locale: "en", section: "notifications" },
    { locale: "en", section: "website-settings" },
    { locale: "en", section: "analytics" },
    { locale: "am", section: "dashboard" },
    { locale: "am", section: "website-content" },
    { locale: "am", section: "departments" },
    { locale: "am", section: "news-articles" },
    { locale: "am", section: "events" },
    { locale: "am", section: "media-library" },
    { locale: "am", section: "sermons" },
    { locale: "am", section: "users" },
    { locale: "am", section: "donations" },
    { locale: "am", section: "notifications" },
    { locale: "am", section: "website-settings" },
    { locale: "am", section: "analytics" },
  ];
}

export default function HamereWengelSectionPage({ params }: { params: { section: string } }) {
  return <SuperAdminPlatform platform="hamere-wengel" section={params.section} />;
}
