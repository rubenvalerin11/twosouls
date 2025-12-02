"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, subtotal, totalItems, updateQuantity, removeItem, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f4f3f1] text-black">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-2xl font-semibold tracking-tight mb-4">Carrito</h1>
          <p className="text-sm text-black/70">
            Tu carrito está vacío.{" "}
            <Link href="/" className="underline">
              Volver a la tienda
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f3f1] text-black">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">
          Carrito ({totalItems})
        </h1>

        {/* LISTA DE PRODUCTOS */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 border border-black/10"
            >
              <div className="h-24 w-24 overflow-hidden rounded-xl bg-[#111] flex items-center justify-center">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="text-sm uppercase tracking-[0.15em] text-black/60">
                  {item.size}
                </p>
                <h2 className="text-base font-semibold">{item.name}</h2>
                <p className="mt-1 text-sm text-black/70">
                  ₡{item.price.toLocaleString("es-CR")}
                </p>

                <div className="mt-2 flex items-center gap-3 text-sm">
                  <span>Cant.</span>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.id,
                        item.size,
                        Number(e.target.value)
                      )
                    }
                    className="w-16 rounded-lg border border-black/20 px-2 py-1 text-sm bg-transparent"
                  />
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="ml-2 text-xs uppercase tracking-[0.15em] text-red-500 hover:text-red-600"
                  >
                    Quitar
                  </button>
                </div>
              </div>

              <div className="text-right text-sm font-semibold">
                ₡{(item.price * item.quantity).toLocaleString("es-CR")}
              </div>
            </div>
          ))}
        </div>

        {/* RESUMEN */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={clearCart}
            className="text-xs uppercase tracking-[0.15em] text-black/60 hover:text-black"
          >
            Vaciar carrito
          </button>

          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-black/60">
              Subtotal
            </p>
            <p className="text-xl font-semibold">
              ₡{subtotal.toLocaleString("es-CR")}
            </p>

            <p className="mt-1 text-xs text-black/60">
              * El envío se calcula al finalizar compra.
            </p>

            {/* BOTÓN FINALIZAR */}
            <Link
              href="/checkout"
              className="mt-4 inline-block rounded-full bg-black px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            >
              Finalizar compra
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
