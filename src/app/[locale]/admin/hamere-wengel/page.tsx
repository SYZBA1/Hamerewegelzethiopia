import SuperAdminPlatform from "@/components/admin/SuperAdminPlatform";

export const metadata = {
  title: "Hamere Wengel Admin Dashboard",
  description: "Website and ministry management",
};

export default function HamereWengelAdminPage() {
  return <SuperAdminPlatform platform="hamere-wengel" />;
}
