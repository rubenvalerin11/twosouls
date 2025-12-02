"use client";

import { useEffect, useState } from "react";
import { getAdminDashboardData } from "@/lib/adminApi";
import StatCard from "./components/StatCard";

type SalesPoint = {
  label: string;
  total: number;
};

type DashboardData = {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  latestOrders: any[];
  salesByDay: SalesPoint[];
};

export default function AdminPanelHome() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const result = await getAdminDashboardData();
        setData(result);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("No se pudieron cargar las métricas del dashboard.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-sm text-white/60">
        Cargando dashboard de TwoSouls…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-10 text-sm text-red-400">
        {error ?? "Ocurrió un error inesperado."}
      </div>
    );
  }

  const maxSales = Math.max(...data.salesByDay.map((d) => d.total), 0);

  const formatCRC = (v: number) =>
    v.toLocaleString("es-CR", {
      style: "currency",
      currency: "CRC",
      maximumFractionDigits: 0,
    });

  return (
    <div className="space-y-8">
      {/* Título principal */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Dashboard TwoSouls
        </h1>
        <p className="text-sm text-white/50 mt-1">
          Resumen en vivo de ventas, pedidos y clientes de la tienda.
        </p>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Ingresos totales"
          value={formatCRC(data.totalRevenue)}
          subtitle="Sumatoria de todos los pedidos registrados."
        />
        <StatCard
          label="Pedidos"
          value={data.totalOrders}
          subtitle="Pedidos procesados en la tienda."
        />
        <StatCard
          label="Clientes únicos"
          value={data.totalCustomers}
          subtitle="Clientes distintos según correo."
        />
        <StatCard
          label="Productos activos"
          value={data.totalProducts}
          subtitle="Productos disponibles en catálogo."
        />
      </div>

      {/* Gráfico simple de ventas por día */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Actividad de ventas (últimos 7 días)
              </h2>
              <p className="text-xs text-white/50">
                Basado en la fecha de creación de los pedidos.
              </p>
            </div>
          </div>

          <div className="flex items-end gap-3 h-40">
            {data.salesByDay.map((day) => {
              const height =
                maxSales > 0 ? Math.max((day.total / maxSales) * 100, 8) : 8;

              return (
                <div
                  key={day.label}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <div
                    className="w-full rounded-md bg-emerald-400/80"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-[10px] text-white/50">
                    {day.label}
                  </span>
                  <span className="text-[10px] text-white/60">
                    {day.total > 0 ? formatCRC(day.total) : "—"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Últimos pedidos */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-sm font-semibold text-white mb-3">
            Últimos pedidos
          </h2>
          {data.latestOrders.length === 0 ? (
            <p className="text-xs text-white/50">
              Aún no hay pedidos registrados.
            </p>
          ) : (
            <ul className="space-y-3 text-xs">
              {data.latestOrders.map((o: any) => (
                <li
                  key={o._id || o.id}
                  className="flex flex-col rounded-lg border border-white/10 bg-black/40 px-3 py-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">
                      #{o.orderNumber || o._id?.slice(-6) || "N/A"}
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      {formatCRC(
                        (o.total as number) ??
                          (o.amount as number) ??
                          (o.totalAmount as number) ??
                          0
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-white/60">
                      {(o.email ||
                        o.customerEmail ||
                        o.user?.email ||
                        "Cliente") as string}
                    </span>
                    <span className="text-white/40">
                      {o.createdAt
                        ? new Date(o.createdAt).toLocaleString("es-CR", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>
                  {o.status && (
                    <span className="mt-1 inline-flex w-fit rounded-full bg-white/10 px-2 py-[2px] text-[10px] uppercase tracking-wide text-white/60">
                      {o.status}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
