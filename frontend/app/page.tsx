"use client";

import { useState, useEffect } from "react";
import Hero from "@/app/components/Hero";
import AboutSection from "@/app/components/AboutSection";
import ProductCard from "@/app/components/ProductCard";
import ProductSidebar from "@/app/components/ProductSidebar";
import CartSidebar from "@/app/components/CartSidebar";
import { fetchProducts } from "@/lib/api";
import { useCart } from "./context/CartContext";
import PayPalButton from "@/app/components/PayPalButton";


export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const { addItem, cartOpen, setCartOpen } = useCart();

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetchProducts();

        // ORDENAR: CAMISA PRIMERO
        const sorted = [...response].sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          if (nameA.includes("camisa")) return -1;
          if (nameB.includes("camisa")) return 1;
          return 0;
        });

        setProducts(sorted);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    load();
  }, []);

  const collections = [
    {
      label: "FIRST DROP",
      title: "Camisas",
      subtitle: "Boxy fit, 100% algodón.",
      slug: "camisas",
    },
    {
      label: "REGALÍAS",
      title: "Stickers",
      subtitle: "Sticker de nuestro logo en un tono mate.",
      slug: "stickers",
    },
  ];

  return (
    <main className="bg-[#f4f3f1] text-black">
      {/* HERO */}
      <Hero />

      {/* SECCIÓN DE PRODUCTOS */}
      <section id="productos" className="border-y border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-8">
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-black/60">
              Drop limitado · TwoSouls
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Colección
            </h2>
          </div>

          {products.length === 0 ? (
            <p className="mt-6 text-sm text-black/60">
              Aún no hay productos publicados.
            </p>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p: any) => (
                <ProductCard
                  key={p._id}
                  product={{
                    id: p._id,
                    name: p.name,
                    price: p.price,
                    description: p.description,
                    imageUrl: p.imageUrl,
                    sizes: ["S", "M", "L"],
                  }}
                  onClick={() => {
                    setSelectedProduct(p);
                    setSidebarOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECCIÓN COLECCIONES */}
      <section id="colecciones" className="mx-auto max-w-6xl px-4 py-16">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-black/60">
            Colecciones
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Explora el drip de TwoSouls
          </h2>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c) => (
            <div
              key={c.slug}
              className="flex flex-col justify-between rounded-3xl border border-black/10 bg-[#f4f3f1] px-4 py-6 shadow-sm"
            >
              <div>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-black/45">
                  {c.label}
                </p>

                <h3 className="mt-2 text-base font-semibold">{c.title}</h3>

                <p className="mt-1 text-xs text-black/60">{c.subtitle}</p>
              </div>

              <span className="mt-4 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-black/80">
                Ver {c.slug}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <AboutSection />

      {/* SIDEBARS */}
      <ProductSidebar
        open={sidebarOpen}
        product={selectedProduct}
        onClose={() => setSidebarOpen(false)}
        onAddToCart={(product, size, quantity) => {
          if (!product) return;

          addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            size,
            quantity,
          });

          setSidebarOpen(false);
        }}
      />

      {/* 🛒 FIX DEFINITIVO: PROP CORRECTO */}
      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </main>
  );
}
