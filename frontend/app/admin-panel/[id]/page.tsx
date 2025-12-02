"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

const ORDER_DETAIL_URL = "http://localhost:3001/api/admin/orders"; // /:id

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  size?: string;
};

type OrderDetail = {
  _id: string;
  clientName: string;
  email: string;
  address: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${ORDER_DETAIL_URL}/${id}`, {
          withCredentials: true,
        });
        setOrder(res.data.order ?? res.data);
      } catch (e) {
        console.error("Error obteniendo detalle de pedido", e);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div>
        <p className="text-neutral-400">Cargando detalle de pedido...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/admin-panel/orders"
        className="text-xs text-neutral-400 hover:text-neutral-200"
      >
        ← Volver a pedidos
      </Link>

      <h1 className="text-2xl font-bold">Pedido {order._id.slice(-6)}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <h2 className="font-semibold mb-3">Productos</h2>
          <div className="space-y-2 text-sm">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between bg-neutral-800/60 rounded-lg px-3 py-2"
              >
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-neutral-400">
                    Cantidad: {item.quantity}
                    {item.size && ` · Talla: ${item.size}`}
                  </div>
                </div>
                <div className="font-semibold">
                  ₡{(item.price * item.quantity).toLocaleString("es-CR")}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-3 text-sm">
          <h2 className="font-semibold mb-2">Resumen</h2>
          <p><span className="text-neutral-400">Cliente:</span> {order.clientName}</p>
          <p><span className="text-neutral-400">Email:</span> {order.email}</p>
          <p><span className="text-neutral-400">Dirección:</span> {order.address}</p>
          <p>
            <span className="text-neutral-400">Fecha:</span>{" "}
            {new Date(order.createdAt).toLocaleString("es-CR")}
          </p>
          <p>
            <span className="text-neutral-400">Estado:</span>{" "}
            <span className="px-2 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-xs">
              {order.status}
            </span>
          </p>
          <p className="pt-2 border-t border-neutral-800">
            <span className="text-neutral-400">Total:</span>{" "}
            <span className="font-bold">
              ₡{order.total.toLocaleString("es-CR")}
            </span>
          </p>

          <Link
            href={`/admin-panel/orders/${order._id}/invoice`}
            className="block text-center mt-3 text-xs px-3 py-2 rounded-lg bg-white text-black font-semibold hover:bg-neutral-200"
          >
            Ver factura HTML
          </Link>
        </div>
      </div>
    </div>
  );
}
