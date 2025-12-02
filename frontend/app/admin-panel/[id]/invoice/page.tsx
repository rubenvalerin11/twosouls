"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const ORDER_DETAIL_URL = "http://localhost:3001/api/admin/orders"; // /:id

type InvoiceItem = {
  name: string;
  quantity: number;
  price: number;
  size?: string;
};

type InvoiceData = {
  _id: string;
  clientName: string;
  email: string;
  address: string;
  total: number;
  createdAt: string;
  items: InvoiceItem[];
};

export default function InvoicePage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<InvoiceData | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${ORDER_DETAIL_URL}/${id}`, {
          withCredentials: true,
        });
        setOrder(res.data.order ?? res.data);
      } catch (e) {
        console.error("Error obteniendo factura", e);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="p-8 text-neutral-300">Cargando factura...</div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex justify-center py-10">
      <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Factura Two Souls</h1>
            <p className="text-xs text-neutral-400 mt-1">
              Inspo DripClub · No es PDF, es HTML imprimible.
            </p>
          </div>
          <div className="text-right text-xs text-neutral-400">
            <p>Fecha: {new Date(order.createdAt).toLocaleString("es-CR")}</p>
            <p>ID: {order._id}</p>
          </div>
        </div>

        {/* CLIENTE */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <p className="font-semibold mb-1">Facturar a:</p>
            <p>{order.clientName}</p>
            <p className="text-neutral-400 text-xs">{order.email}</p>
            <p className="text-neutral-400 text-xs">{order.address}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold mb-1">Emisor:</p>
            <p>Two Souls</p>
            <p className="text-neutral-400 text-xs">San José, Costa Rica</p>
          </div>
        </div>

        {/* ITEMS */}
        <table className="w-full text-xs mb-6 border-collapse">
          <thead>
            <tr className="bg-neutral-800 text-neutral-300">
              <th className="text-left px-3 py-2 rounded-l-lg">Producto</th>
              <th className="text-left px-3 py-2">Talla</th>
              <th className="text-center px-3 py-2">Cantidad</th>
              <th className="text-right px-3 py-2">Precio</th>
              <th className="text-right px-3 py-2 rounded-r-lg">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i} className="border-b border-neutral-800">
                <td className="px-3 py-2">{item.name}</td>
                <td className="px-3 py-2 text-neutral-400">
                  {item.size ?? "-"}
                </td>
                <td className="px-3 py-2 text-center">{item.quantity}</td>
                <td className="px-3 py-2 text-right">
                  ₡{item.price.toLocaleString("es-CR")}
                </td>
                <td className="px-3 py-2 text-right">
                  ₡{(item.price * item.quantity).toLocaleString("es-CR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTAL */}
        <div className="flex justify-end mb-6">
          <div className="w-full max-w-xs text-sm">
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Subtotal</span>
              <span>₡{order.total.toLocaleString("es-CR")}</span>
            </div>
            {/* Aquí podrías añadir envío, impuestos, etc */}
            <div className="flex justify-between py-2 border-t border-neutral-800 mt-2">
              <span className="font-semibold">Total</span>
              <span className="font-bold">
                ₡{order.total.toLocaleString("es-CR")}
              </span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <p className="text-[11px] text-neutral-500 text-center">
          Gracias por comprar en Two Souls. Esta factura es un documento generado
          por el sistema y no requiere firma.
        </p>
      </div>
    </div>
  );
}
