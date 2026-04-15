"use client";

import { memo } from "react";

interface DashboardActivityProps {
  title: string;
  activities: string[];
}

const DashboardActivity = memo(function DashboardActivity({ title, activities }: DashboardActivityProps) {
  return (
    <div className="card-gradient-glass p-5 shadow-lg shadow-[#E3EF26]/10">
      <h2 className="text-xl font-semibold text-[#FFFDEE]">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-[#E2FBCE]">
        {activities.map((activity, index) => (
          <li key={index}>• {activity}</li>
        ))}
      </ul>
    </div>
  );
});

export default DashboardActivity;