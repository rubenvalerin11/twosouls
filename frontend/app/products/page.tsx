"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import ProductSidebar from "@/app/components/ProductSidebar";
import { fetchProducts } from "@/lib/api";
import { useCart } from "../context/CartContext";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const { addItem } = useCart();

  useEffect(() => {
    const load = async () => {
      const response = await fetchProducts();

      // CAMISA PRIMERO
      const sorted = [...response].sort((a, b) => {
        const A = a.name.toLowerCase();
        const B = b.name.toLowerCase();
        if (A.includes("camisa")) return -1;
        if (B.includes("camisa")) return 1;
        return 0;
      });

      setProducts(sorted);
    };

    load();
  }, []);

  return (
    <main className="bg-[#f4f3f1] min-h-screen px-4 py-12">
      <h1 className="text-3xl font-semibold mb-8">Colección completa</h1>

      {products.length === 0 ? (
        <p className="text-sm text-black/60">Aún no hay productos publicados.</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...products]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((p: any) => (
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
                  setSelectedProduct({
                    id: p._id,
                    name: p.name,
                    price: p.price,
                    description: p.description,
                    imageUrl: p.imageUrl,
                  });
                  setSidebarOpen(true);
                }}
              />
            ))}
        </div>
      )}

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
    </main>
  );
}
