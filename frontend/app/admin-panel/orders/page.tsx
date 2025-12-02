"use client";

import React, { useEffect, useState } from "react";
import {
  AdminOrder,
  getAdminOrders,
  updateAdminOrderStatus,
} from "@/lib/adminApi";

export default function AdminPanelOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadOrders() {
    try {
      setLoading(true);
      setError(null);
      const data = await getAdminOrders();
      setOrders(data || []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las órdenes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleStatusChange(id: string, status: string) {
    try {
      setSavingId(id);
      await updateAdminOrderStatus(
        id,
        status as "pending" | "paid" | "shipped" | "cancelled"
      );
      await loadOrders();
    } catch (err) {
      console.error(err);
      alert("Error actualizando estado de la orden.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <header>
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <p className="text-sm text-white/60">
          Revisa y actualiza el estado de los pedidos realizados en la tienda.
        </p>
      </header>

      {loading && (
        <div className="rounded-lg border border-white/10 bg-black/40 px-4 py-6 text-sm text-white/70">
          Cargando pedidos...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg bg-red-950/70 border border-red-700/70 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="rounded-lg border border-white/10 bg-black/40 px-4 py-6 text-sm text-white/70">
          No hay pedidos todavía.
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-white/60">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o._id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs">
                      {o._id.slice(-8)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-sm">
                        {o.customer?.name || "—"}
                      </span>
                      <span className="text-xs text-white/60">
                        {o.email || o.customer?.email || "—"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    ₡ {Number(o.total).toLocaleString("es-CR")}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full px-2 py-1 text-[11px] uppercase tracking-wide
                      bg-white/10">
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-white/60">
                    {o.createdAt
                      ? new Date(o.createdAt).toLocaleString("es-CR")
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <select
                      disabled={savingId === o._id}
                      value={o.status}
                      onChange={(e) =>
                        handleStatusChange(o._id, e.target.value)
                      }
                      className="bg-black/60 border border-white/20 rounded-lg px-2 py-1 text-xs"
                    >
                      <option value="pending">pending</option>
                      <option value="paid">paid</option>
                      <option value="shipped">shipped</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
