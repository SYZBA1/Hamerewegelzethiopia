"use client";

import { memo } from "react";

interface DashboardActivityProps {
  title: string;
  activities: string[];
}

const DashboardActivity = memo(function DashboardActivity({ title, activities }: DashboardActivityProps) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg shadow-black/20">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-[#cbe6ce]">
        {activities.map((activity, index) => (
          <li key={index}>• {activity}</li>
        ))}
      </ul>
    </div>
  );
});

export default DashboardActivity;