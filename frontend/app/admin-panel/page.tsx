"use client";

import { useEffect, useState } from "react";
import { getAdminDashboardData } from "@/lib/adminApi";
import StatCard from "./components/StatCard";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await getAdminDashboardData();
        setMetrics(data);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Panel Administrativo</h1>

      {loading ? (
        <p className="text-gray-400">Cargando métricas...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Productos activos"
              value={metrics.totalProducts}
              color="blue"
            />
            <StatCard
              title="Pedidos totales"
              value={metrics.totalOrders}
              color="green"
            />
            <StatCard
              title="Ingresos totales"
              value={`₡${metrics.revenue.toLocaleString()}`}
              color="purple"
            />
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Datos actualizados automáticamente desde tu API.
          </p>
        </>
      )}
    </div>
  );
}
