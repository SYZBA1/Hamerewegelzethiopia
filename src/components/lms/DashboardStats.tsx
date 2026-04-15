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
        <div key={index} className="card-gradient-glass p-5 shadow-lg shadow-[#E3EF26]/10">
          <p className="text-xs uppercase tracking-widest text-[#E2FBCE]">{stat.label}</p>
          <p className="mt-2 text-3xl font-bold text-[#FFFDEE]">{stat.value}</p>
        </div>
      ))}
    </div>
  );
});

export default DashboardStats;