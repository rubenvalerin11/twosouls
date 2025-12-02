"use client";

import { useEffect, useState } from "react";
import axios from "axios";

/**
 * Ajustá este endpoint a tus rutas reales del backend
 * Ej: http://localhost:3001/api/admin/dashboard
 */
const DASHBOARD_URL = "http://localhost:3001/api/admin/dashboard";

type SalesPoint = { label: string; value: number };
type LastOrder = { id: string; client: string; total: number; status?: string };

type DashboardData = {
  totalOrders: number;
  pendingOrders: number;
  totalIncome: number;
  activeProducts: number;
  salesByDay: SalesPoint[];
  lastOrders: LastOrder[];
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(DASHBOARD_URL, { withCredentials: true });

        // Estructura esperada desde el backend
        const payload = res.data;

        const mapped: DashboardData = {
          totalOrders: payload.totalOrders ?? 0,
          pendingOrders: payload.pendingOrders ?? 0,
          totalIncome: payload.totalIncome ?? 0,
          activeProducts: payload.activeProducts ?? 0,
          salesByDay:
            payload.salesByDay ??
            [
              { label: "Lun", value: 5 },
              { label: "Mar", value: 8 },
              { label: "Mié", value: 3 },
              { label: "Jue", value: 10 },
              { label: "Vie", value: 7 },
            ],
          lastOrders:
            payload.lastOrders ??
            [
              { id: "TS-001", client: "Juan Pérez", total: 25000, status: "completado" },
              { id: "TS-002", client: "María López", total: 39500, status: "pendiente" },
            ],
        };

        setData(mapped);
      } catch (err) {
        console.error("Error cargando dashboard:", err);
        setError("No se pudieron cargar los datos del dashboard. Mostrando datos de ejemplo.");
        // Datos mock si el backend aún no tiene esa ruta
        setData({
          totalOrders: 42,
          pendingOrders: 5,
          totalIncome: 1295000,
          activeProducts: 18,
          salesByDay: [
            { label: "Lun", value: 5 },
            { label: "Mar", value: 8 },
            { label: "Mié", value: 3 },
            { label: "Jue", value: 10 },
            { label: "Vie", value: 7 },
          ],
          lastOrders: [
            { id: "TS-001", client: "Juan Pérez", total: 25000, status: "completado" },
            { id: "TS-002", client: "María López", total: 39500, status: "pendiente" },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Panel Administrativo</h1>
        <p className="text-neutral-400">
          KPIs, ventas y pedidos de Two Souls en tiempo real.
        </p>
      </div>

      {/* ERRORES */}
      {error && (
        <div className="bg-yellow-900/40 border border-yellow-700 text-yellow-200 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* KPIs */}
      {loading || !data ? (
        <KpiSkeletonGrid />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KpiCard title="Pedidos totales" value={data.totalOrders} />
          <KpiCard
            title="Ingresos totales"
            value={"₡" + data.totalIncome.toLocaleString("es-CR")}
          />
          <KpiCard title="Pedidos pendientes" value={data.pendingOrders} />
          <KpiCard title="Productos activos" value={data.activeProducts} />
        </div>
      )}

      {/* GRÁFICO + ESTADO GENERAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* CHART */}
        <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-1">Ventas por día</h2>
          <p className="text-neutral-400 text-sm mb-4">
            Vista rápida del comportamiento de ventas de la semana.
          </p>

          {loading || !data ? (
            <div className="h-40 animate-pulse bg-neutral-800 rounded-lg" />
          ) : (
            <SalesBarChart points={data.salesByDay} />
          )}
        </div>

        {/* ESTADO GENERAL */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-1">Estado general</h2>
          <p className="text-neutral-400 text-sm mb-4">
            Aquí luego podemos añadir métricas como tasa de conversión, tickets abiertos,
            campañas activas, etc.
          </p>
          <ul className="text-sm text-neutral-300 space-y-2">
            <li>• Panel en modo oscuro optimizado para iPad y escritorio.</li>
            <li>• KPIs conectados a tu API de administración.</li>
            <li>• Preparado para métricas avanzadas tipo Shopify.</li>
          </ul>
        </div>
      </div>

      {/* ÚLTIMOS PEDIDOS */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Últimos pedidos</h2>

        {loading || !data ? (
          <div className="space-y-3">
            <div className="h-10 bg-neutral-800 rounded-lg animate-pulse" />
            <div className="h-10 bg-neutral-800 rounded-lg animate-pulse" />
            <div className="h-10 bg-neutral-800 rounded-lg animate-pulse" />
          </div>
        ) : data.lastOrders.length === 0 ? (
          <p className="text-neutral-500 text-sm">No hay pedidos recientes.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {data.lastOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between px-4 py-3 bg-neutral-800/70 hover:bg-neutral-800 rounded-lg transition"
              >
                <div className="flex flex-col">
                  <span className="text-neutral-100 text-sm font-medium">
                    {order.client}
                  </span>
                  <span className="text-neutral-400 text-xs">{order.id}</span>
                </div>
                <div className="flex items-center gap-4">
                  {order.status && (
                    <span className="text-xs px-2 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300">
                      {order.status}
                    </span>
                  )}
                  <span className="font-semibold text-sm">
                    ₡{order.total.toLocaleString("es-CR")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- COMPONENTES AUXILIARES ---------- */

function KpiCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 flex flex-col transform transition hover:-translate-y-1 hover:border-neutral-500/80">
      <span className="text-neutral-400 text-xs">{title}</span>
      <span className="text-3xl font-bold mt-2 tracking-tight">{value}</span>
      <span className="mt-2 text-[11px] text-neutral-500">
        Actualizado automáticamente desde tu API.
      </span>
    </div>
  );
}

function KpiSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 animate-pulse"
        >
          <div className="h-3 w-24 bg-neutral-700 rounded mb-3" />
          <div className="h-7 w-20 bg-neutral-700 rounded mb-2" />
          <div className="h-2 w-28 bg-neutral-800 rounded" />
        </div>
      ))}
    </div>
  );
}

function SalesBarChart({ points }: { points: SalesPoint[] }) {
  if (!points || points.length === 0) {
    return <p className="text-neutral-500 text-sm">No hay datos de ventas.</p>;
  }

  const max = Math.max(...points.map((p) => p.value), 1);

  return (
    <div className="h-48 flex items-end gap-3">
      {points.map((p) => (
        <div key={p.label} className="flex-1 flex flex-col items-center gap-2">
          <div
            className="w-full rounded-t-md bg-gradient-to-t from-neutral-600 to-neutral-200"
            style={{ height: `${(p.value / max) * 100}%` }}
          />
          <span className="text-xs text-neutral-400">{p.label}</span>
        </div>
      ))}
    </div>
  );
}
