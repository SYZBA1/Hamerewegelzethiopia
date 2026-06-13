import SuperAdminPlatform from "@/components/admin/SuperAdminPlatform";

export function generateStaticParams() {
  return [
    { locale: "en", section: "dashboard" },
    { locale: "en", section: "admissions" },
    { locale: "en", section: "students" },
    { locale: "en", section: "teachers" },
    { locale: "en", section: "courses" },
    { locale: "en", section: "classes" },
    { locale: "en", section: "assignments" },
    { locale: "en", section: "certificates" },
    { locale: "en", section: "departments" },
    { locale: "en", section: "finance" },
    { locale: "en", section: "reports" },
    { locale: "en", section: "settings" },
    { locale: "am", section: "dashboard" },
    { locale: "am", section: "admissions" },
    { locale: "am", section: "students" },
    { locale: "am", section: "teachers" },
    { locale: "am", section: "courses" },
    { locale: "am", section: "classes" },
    { locale: "am", section: "assignments" },
    { locale: "am", section: "certificates" },
    { locale: "am", section: "departments" },
    { locale: "am", section: "finance" },
    { locale: "am", section: "reports" },
    { locale: "am", section: "settings" },
  ];
}

export default function SaintCyrilSectionPage({ params }: { params: { section: string } }) {
  return <SuperAdminPlatform platform="saint-cyril" section={params.section} />;
}
