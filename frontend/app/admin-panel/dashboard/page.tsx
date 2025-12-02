"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Error al cargar métricas");

        const data = await res.json();
        setMetrics(data);
      } catch (error) {
        console.error("Error:", error);
        setMetrics(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) return <p>Cargando métricas...</p>;

  if (!metrics) return <p>Error al obtener métricas.</p>;

  return (
    <div>
      <h1>Dashboard Admin</h1>
      <p>Total órdenes: {metrics.totalOrders}</p>
      <p>Órdenes pendientes: {metrics.pendingOrders}</p>
      <p>Ingresos totales: ${metrics.totalIncome}</p>
      <p>Productos activos: {metrics.activeProducts}</p>
    </div>
  );
}
