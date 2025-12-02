"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Product } from "./ProductCard";
import { useCart } from "@/app/context/CartContext";  // ⭐ USAR CONTEXTO GLOBAL

interface Props {
  open: boolean;
  product: Product | null;
  onClose: () => void;
}

export default function ProductSidebar({ open, product, onClose }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // ⭐ CARRITO GLOBAL (NO ZUSTAND)
  const { addItem } = useCart();

  useEffect(() => {
    setSelectedSize(null);
  }, [product]);

  if (!open || !product) return null;

  const isPanuelo = product.name.toLowerCase().includes("pañuelo");

  const handleAdd = () => {
    if (!isPanuelo && !selectedSize) return;

    const finalSize = isPanuelo ? "Única" : selectedSize!;

    // ⭐ AGREGAR PRODUCTO AL CARRITO GLOBAL
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      size: finalSize,
      quantity: 1,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <button type="button" onClick={onClose} className="text-xl leading-none">
            ×
          </button>

          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-black/60">
            Detalle de producto
          </span>

          <div className="w-5" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <div className="relative mb-4 h-64 w-full overflow-hidden rounded-xl bg-[#111]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="mt-1 text-sm text-black/70">
            ₡{product.price.toLocaleString("es-CR")}
          </p>

          <div className="mt-4 space-y-1 text-sm text-black/80">
            <p>
              <span className="font-semibold">Tallas: </span>
              {isPanuelo ? "Única (55×55 cm)" : "S, M, L"}
            </p>

            <p>
              <span className="font-semibold">Material: </span>
              100% algodón premium
            </p>

            <p>
              <span className="font-semibold">Medidas: </span>
              {isPanuelo ? "55×55 cm" : "Ver guía de tallas"}
            </p>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-black/80">
            {product.description}
          </p>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/70">
              {isPanuelo ? "Talla única" : "Selecciona tu talla"}
            </p>

            {isPanuelo ? (
              <p className="mt-2 text-sm text-black/60">
                Este producto no requiere selección de talla.
              </p>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                {["S", "M", "L"].map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        active
                          ? "border-black bg-black text-white"
                          : "border-black/30 text-black hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="border-t px-4 py-4">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!isPanuelo && !selectedSize}
            className="w-full rounded-full bg-black px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white disabled:bg-black/40 disabled:text-white/60"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
