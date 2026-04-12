"use client";

import { memo } from "react";

interface QuickAction {
  label: string;
  description: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

interface AdminQuickActionsProps {
  actions: QuickAction[];
}

const AdminQuickActions = memo(function AdminQuickActions({ actions }: AdminQuickActionsProps) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg shadow-black/20">
      <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`rounded-xl border border-white/20 p-4 text-left transition-colors ${
              action.variant === "primary"
                ? "bg-[#0B2B26]/80 hover:bg-[#235347] text-[#cbe6ce]"
                : "bg-[#163832]/60 hover:bg-[#235347] text-[#cbe6ce]"
            }`}
          >
            <h3 className="text-sm font-semibold">{action.label}</h3>
            <p className="text-xs text-[#8EB69B] mt-1">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
});

export default AdminQuickActions;