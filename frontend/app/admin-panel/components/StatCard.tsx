import React from "react";

interface StatCardProps {
  label: string;
  value: string;
  subLabel?: string;
}

export function StatCard({ label, value, subLabel }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/60 p-4 flex flex-col gap-1">
      <span className="text-xs text-white/50 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-2xl font-bold">{value}</span>
      {subLabel && (
        <span className="text-xs text-emerald-400/80">{subLabel}</span>
      )}
    </div>
  );
}
