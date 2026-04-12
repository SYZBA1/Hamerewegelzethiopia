"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface AuthShellProps {
  landingPath: string;
  sideContent: ReactNode;
  children: ReactNode;
}

export default function LMSAuthShell({ landingPath, sideContent, children }: AuthShellProps) {
  return (
    <main className="grid min-h-screen w-full grid-cols-1 gap-6 bg-[#051F20] p-4 sm:p-6 md:grid-cols-2 lg:p-8">
      <section className="relative hidden overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#051F20] via-[#163832] to-[#235347] p-8 text-white shadow-[0_40px_120px_rgba(0,0,0,0.55)] md:flex md:flex-col md:justify-between">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#8EB69B]/15 blur-3xl" />
          <div className="absolute right-8 top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#051F20]/80 to-transparent" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between">
          {sideContent}
        </div>
      </section>

      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden rounded-[2rem] bg-[#051F20]/95 p-6 shadow-[0_35px_80px_rgba(0,0,0,0.5)] sm:p-8">
        <Link
          href={landingPath}
          className="absolute right-5 top-5 z-20 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
        >
          Hamere Wengel
        </Link>

        <div className="relative z-10 mx-auto w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}
