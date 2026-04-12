"use client";

import Link from "next/link";
import { memo } from "react";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  userName: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

const DashboardHeader = memo(function DashboardHeader({
  title,
  subtitle,
  userName,
  primaryAction,
  secondaryAction,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/20 bg-[#163832]/60 p-5 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-sm text-[#cbe6ce]">
          {subtitle.replace("{name}", userName)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {primaryAction && (
          <Link
            href={primaryAction.href}
            className="rounded-xl border border-white/20 bg-[#0B2B26]/80 px-4 py-2 text-sm font-semibold text-[#cbe6ce] hover:bg-[#235347]"
          >
            {primaryAction.label}
          </Link>
        )}
        {secondaryAction && (
          <button
            type="button"
            onClick={secondaryAction.onClick}
            className="rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 text-sm font-bold text-[#091913] shadow-lg shadow-amber-400/40"
          >
            {secondaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
});

export default DashboardHeader;