import React from "react";

export function Topbar() {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-sm text-white/50">
          Resumen general de tu tienda TwoSouls.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="text-xs px-3 py-1.5 rounded-full border border-white/20 text-white/70 hover:bg-white/10 transition">
          Ver tienda
        </button>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">
          TS
        </div>
      </div>
    </header>
  );
}
