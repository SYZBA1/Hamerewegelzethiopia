import { redirect } from "next/navigation";

// Root page — redirect to default locale (Amharic)
export default function RootPage() {
  redirect("/am");
}
