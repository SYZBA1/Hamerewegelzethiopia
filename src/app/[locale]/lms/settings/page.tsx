"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LMSSettingsPage() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("lmsAuth")) {
      router.replace("/lms/login");
    }
  }, [router]);

  return (
    <main className="mx-auto min-h-screen max-w-6xl p-4 text-mint">
      <div className="card-dark-gradient p-6">
        <h1 className="text-2xl font-semibold text-brightYellow">Settings</h1>
        <p className="mt-2 text-mint/80">Profile and security settings coming soon.</p>
      </div>
    </main>
  );
}
