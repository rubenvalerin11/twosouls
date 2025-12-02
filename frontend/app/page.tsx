// frontend/app/admin-panel/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  getAdminDashboardData,
  DashboardMetrics,
} from "@/lib/adminApi";
import { useRouter } from "next/navigation";
import { FiBox, FiShoppingBag, FiAlertCircle, FiDollarSign } from "react-icons/fi";

type LoadState = "idle" | "loading" | "ok" | "error";

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [state, setState] = useState<LoadState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState("loading");
      setErrorMsg(null);

      try {
        const data = await getAdminDashboardData();
        if (cancelled) return;

        setMetrics(data);
        setState("ok");
      } catch (err: any) {
        if (cancelled) return;

        console.error("Dashboard error:", err);

        // Si el backend responde 401 => mandar al login
        if (err?.status === 401) {
          router.replace("/admin-panel/login?from=/admin-panel");
          return;
        }

        setErrorMsg("No se pudieron cargar las métricas del dashboard.");
        setState("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Panel Administrativo
          </h1>
          <p className="text-sm text-white/60">
            Datos actualizados automáticamente desde tu API.
          </p>
        </div>
      </header>

      {/* Estado de error */}
      {state === "error" && (
        <div className="rounded-md border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {errorMsg || "Ocurrió un error inesperado en el dashboard."}
        </div>
      )}

      {/* KPIs principales */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<FiShoppingBag className="h-6 w-6" />}
          label="Pedidos totales"
          value={
            metrics ? metrics.totalOrders.toLocaleString("es-CR") : "—"
          }
          loading={state === "loading" && !metrics}
        />

        <StatCard
          icon={<FiDollarSign className="h-6 w-6" />}
          label="Ingresos totales"
          value={
            metrics
              ? `₡ ${metrics.totalRevenue.toLocaleString("es-CR")}`
              : "—"
          }
          loading={state === "loading" && !metrics}
        />

        <StatCard
          icon={<FiAlertCircle className="h-6 w-6" />}
          label="Pedidos pendientes"
          value={
            metrics ? metrics.pendingOrders.toLocaleString("es-CR") : "—"
          }
          loading={state === "loading" && !metrics}
        />

        <StatCard
          icon={<FiBox className="h-6 w-6" />}
          label="Productos activos"
          value={
            metrics ? metrics.totalProducts.toLocaleString("es-CR") : "—"
          }
          loading={state === "loading" && !metrics}
        />
      </section>

      {/* Últimos pedidos */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-black/40 p-4">
          <h2 className="mb-3 text-sm font-semibold text-white">
            Últimos pedidos
          </h2>

          {state === "loading" && !metrics && (
            <p className="text-sm text-white/60">Cargando pedidos…</p>
          )}

          {metrics && metrics.lastOrders.length === 0 && (
            <p className="text-sm text-white/60">
              Aún no hay pedidos registrados.
            </p>
          )}

          {metrics && metrics.lastOrders.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-white/10 text-xs uppercase text-white/50">
                  <tr>
                    <th className="py-2 pr-4">Pedido</th>
                    <th className="py-2 pr-4">Cliente</th>
                    <th className="py-2 pr-4">Fecha</th>
                    <th className="py-2 pr-4 text-right">Total</th>
                    <th className="py-2 pr-4 text-right">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.lastOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-white/5 last:border-none hover:bg-white/5"
                    >
                      <td className="py-2 pr-4 text-white/80">
                        #{order._id.slice(-6)}
                      </td>
                      <td className="py-2 pr-4 text-white/60">
                        {order.user?.name || "—"}
                      </td>
                      <td className="py-2 pr-4 text-white/60">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString("es-CR")
                          : "—"}
                      </td>
                      <td className="py-2 pr-4 text-right text-white">
                        {typeof order.totalAmount === "number" ||
                        typeof order.total === "number"
                          ? `₡ ${(
                              order.totalAmount ?? order.total ?? 0
                            ).toLocaleString("es-CR")}`
                          : "—"}
                      </td>
                      <td className="py-2 pr-4 text-right">
                        <span className="inline-flex rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">
                          {order.status || "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Caja lateral para notas / future charts */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <h2 className="mb-2 text-sm font-semibold text-white">
            Estado general
          </h2>
          <p className="text-sm text-white/60">
            Aquí más adelante podemos agregar gráficas (ventas por día,
            estados de pedidos, etc.). Por ahora se muestran los KPIs
            principales en tiempo real.
          </p>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  loading?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
      <div>
        <p className="text-xs text-white/50">{label}</p>
        <p className="mt-1 text-xl font-semibold text-white">
          {loading ? "…" : value}
        </p>
      </div>
      <div className="rounded-full bg-white/10 p-2 text-white/80">
        {icon}
      </div>
    </div>
  );
}
