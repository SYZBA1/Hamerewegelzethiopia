"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LMSAssignmentsPage() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("lmsAuth")) {
      router.replace("/lms/login");
    }
  }, [router]);

  return (
    <main className="mx-auto min-h-screen max-w-6xl p-4 text-slate-100">
      <h1 className="text-2xl font-semibold text-amber-200">Assignments</h1>
      <p className="mt-2 text-slate-300">No pending assignments at the moment.</p>
    </main>
  );
}
