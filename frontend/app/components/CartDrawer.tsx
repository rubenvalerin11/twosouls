"use client";

import { useState } from "react";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón invisible controlado por Navbar luego */}
      <button onClick={() => setOpen(true)} className="hidden" id="openCartBtn" />

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setOpen(false)}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl p-6 flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-4">Carrito</h2>

            <p className="text-neutral-600 text-sm">
              Aún no hay productos en tu carrito.
            </p>

            <button
              onClick={() => setOpen(false)}
              className="mt-auto btn-primary"
            >
              Cerrar
            </button>
          </aside>
        </div>
      )}
    </>
  );
}
