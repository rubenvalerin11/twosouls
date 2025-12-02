"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const ORDERS_URL = "http://localhost:3001/api/admin/orders";

type Order = {
  _id: string;
  code?: string;
  clientName: string;
  total: number;
  status: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(ORDERS_URL, { withCredentials: true });
        setOrders(res.data.orders ?? res.data ?? []);
      } catch (e) {
        console.error("Error obteniendo pedidos", e);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Pedidos</h1>
      <p className="text-neutral-400 text-sm">
        Lista completa de pedidos realizados en la tienda.
      </p>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-950 text-neutral-400">
            <tr>
              <th className="text-left px-4 py-3">Código</th>
              <th className="text-left px-4 py-3">Cliente</th>
              <th className="text-left px-4 py-3">Fecha</th>
              <th className="text-left px-4 py-3">Total</th>
              <th className="text-left px-4 py-3">Estado</th>
              <th className="text-right px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-neutral-500">
                  Cargando pedidos...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-neutral-500">
                  No hay pedidos registrados.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id} className="border-t border-neutral-800">
                  <td className="px-4 py-3">{o.code ?? o._id.slice(-6)}</td>
                  <td className="px-4 py-3">{o.clientName}</td>
                  <td className="px-4 py-3">
                    {new Date(o.createdAt).toLocaleString("es-CR")}
                  </td>
                  <td className="px-4 py-3">
                    ₡{o.total.toLocaleString("es-CR")}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-neutral-800 border border-neutral-700">
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin-panel/orders/${o._id}`}
                      className="text-xs px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700"
                    >
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
