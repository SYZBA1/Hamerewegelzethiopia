"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function LMSDashboardPage() {
  const router = useRouter();
  const pathname = usePathname() || "";
  const locale = pathname.split("/")[1] || "";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("lmsAuth");
    if (!auth) {
      router.replace(`/${locale}/lms/login`);
      return;
    }

    try {
      const parsed = JSON.parse(auth);
      const role = parsed?.user?.role?.toLowerCase();
      if (!role) {
        router.replace(`/${locale}/lms/login`);
        return;
      }
      router.replace(`/${locale}/lms/dashboard/${role}`);
    } catch {
      router.replace(`/${locale}/lms/login`);
    }
  }, [locale, router]);

  return (
    <main className="mx-auto flex min-h-screen items-center justify-center text-white">
      {isLoading && <p className="text-lg text-mint/80">Redirecting to your role dashboard...</p>}
    </main>
  );
}
