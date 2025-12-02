"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartSidebar({ open, onClose }: any) {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const router = useRouter();

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Fondo oscuro */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <div
        className={`absolute right-0 top-0 h-full w-[380px] bg-white shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-semibold">Tu carrito</h2>
            <button onClick={onClose} className="text-xl">×</button>
          </div>

          {/* Contenido */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {items.length === 0 && (
              <p className="text-sm text-black/60">Tu carrito está vacío.</p>
            )}

            {items.map((item) => (
              <div
                key={item.id + item.size}
                className="flex gap-4 border-b pb-4"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 rounded object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-xs text-black/60">Talla: {item.size}</p>
                  <p className="font-semibold mt-1">₡{item.price}</p>

                  {/* Controles */}
                  <div className="flex items-center mt-2 gap-2">
                    {/* Restar */}
                    <button
                      className="px-2 border"
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                    >
                      -
                    </button>

                    <span className="w-6 text-center">{item.quantity}</span>

                    {/* Sumar */}
                    <button
                      className="px-2 border"
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                    >
                      +
                    </button>

                    {/* Eliminar */}
                    <button
                      className="text-xs text-red-500 ml-auto"
                      onClick={() => removeItem(item.id, item.size)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="border-t px-4 py-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₡{subtotal.toLocaleString("es-CR")}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                router.push("/checkout");
              }}
              className="w-full mt-4 rounded-full bg-black py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
