"use client";

import { memo } from "react";

interface StatCard {
  label: string;
  value: number | string;
}

interface DashboardStatsProps {
  stats: StatCard[];
}

const DashboardStats = memo(function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, index) => (
        <div key={index} className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg shadow-black/20">
          <p className="text-xs uppercase tracking-widest text-[#8EB69B]">{stat.label}</p>
          <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  );
});

export default DashboardStats;