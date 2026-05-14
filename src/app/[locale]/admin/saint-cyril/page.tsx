import SuperAdminPlatform from "@/components/admin/SuperAdminPlatform";

export const metadata = {
  title: "Saint Cyril LMS Admin Dashboard",
  description: "LMS and academic administration management",
};

export default function SaintCyrilAdminPage() {
  return <SuperAdminPlatform platform="saint-cyril" />;
}
