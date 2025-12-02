"use client";

import React from "react";
import { Topbar } from "./components/Topbar";
import { StatCard } from "./components/StatCard";

export default function AdminPanelDashboard() {
  // De momento son datos mock; luego los conectamos al backend
  const stats = [
    { label: "Ventas de hoy", value: "₡ 135.500", sub: "+18% vs ayer" },
    { label: "Órdenes (30 días)", value: "1.652", sub: "+10% vs mes pasado" },
    { label: "Tasa de conversión", value: "3.2%", sub: "+0.4 pts" },
    { label: "Ticket promedio", value: "₡ 22.350", sub: "" },
  ];

  return (
    <div className="space-y-8">
      <Topbar />

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            subLabel={s.sub}
          />
        ))}
      </section>

      {/* Últimos pedidos (mock) */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-black/60 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Últimos pedidos</h3>
            <span className="text-xs text-white/40">Demo data</span>
          </div>

          <div className="overflow-x-auto text-sm">
            <table className="w-full border-collapse">
              <thead className="text-xs text-white/50 border-b border-white/10">
                <tr>
                  <th className="text-left py-2">Pedido</th>
                  <th className="text-left py-2">Cliente</th>
                  <th className="text-left py-2">Fecha</th>
                  <th className="text-right py-2">Total</th>
                  <th className="text-right py-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "#2050",
                    cliente: "Guy Hawkins",
                    fecha: "Hoy · 13:25",
                    total: "₡ 17.990",
                    estado: "Pagado",
                  },
                  {
                    id: "#2049",
                    cliente: "Floyd Miles",
                    fecha: "Hoy · 13:05",
                    total: "₡ 24.500",
                    estado: "En preparación",
                  },
                  {
                    id: "#2048",
                    cliente: "Cody Fisher",
                    fecha: "Hoy · 12:24",
                    total: "₡ 13.492",
                    estado: "Enviado",
                  },
                ].map((o) => (
                  <tr
                    key={o.id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="py-2">{o.id}</td>
                    <td className="py-2">{o.cliente}</td>
                    <td className="py-2 text-white/60">{o.fecha}</td>
                    <td className="py-2 text-right font-medium">{o.total}</td>
                    <td className="py-2 text-right">
                      <span className="inline-flex items-center rounded-full bg-emerald-500/15 text-emerald-300 px-2 py-0.5 text-[11px]">
                        {o.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Clientes destacados / resumen */}
        <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
          <h3 className="text-sm font-semibold mb-4">Resumen rápido</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span className="text-white/70">Clientes nuevos (30 días)</span>
              <span className="font-medium">+124</span>
            </li>
            <li className="flex justify-between">
              <span className="text-white/70">Tasa de repetición</span>
              <span className="font-medium">37%</span>
            </li>
            <li className="flex justify-between">
              <span className="text-white/70">Carritos abandonados</span>
              <span className="font-medium text-yellow-300">18</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
