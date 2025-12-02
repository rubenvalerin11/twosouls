"use client";

import { useEffect, useState } from "react";

interface Order {
  _id: string;
  customer: string;
  total: number;
  status: string;
  createdAt: string;
}

interface DashboardData {
  totalOrders: number;
  pendingOrders: number;
  totalIncome: number;
  activeProducts: number;
  lastOrders: Order[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar dashboard:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando métricas...</p>;
  if (!data) return <p>No se pudo cargar el dashboard.</p>;

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Dashboard</h2>

      {/* KPI Cards */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <KPI title="Total Pedidos" value={data.totalOrders} />
        <KPI title="Pedidos Pendientes" value={data.pendingOrders} />
        <KPI title="Ingresos Totales" value={`$${data.totalIncome.toFixed(2)}`} />
        <KPI title="Productos Activos" value={data.activeProducts} />
      </div>

      {/* Últimos pedidos */}
      <h3>Últimos Pedidos</h3>
      <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #555" }}>
            <th>ID</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {data.lastOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customer}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KPI({ title, value }: { title: string; value: string | number }) {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#1e1e1e",
        padding: "1.5rem",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h4 style={{ margin: 0, color: "#aaa" }}>{title}</h4>
      <p style={{ fontSize: "1.8rem", fontWeight: "bold", marginTop: "0.5rem" }}>
        {value}
      </p>
    </div>
  );
}
