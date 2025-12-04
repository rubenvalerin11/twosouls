"use client";

import Link from "next/link";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
};

export default function FeaturedGrid({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-white text-center py-10">
        No hay productos disponibles por ahora.
      </div>
    );
  }

  return (
    <div className="w-full py-16 bg-black">
      <h2 className="text-3xl font-bold text-white mb-10 px-6">
        Piezas destacadas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="group bg-white/5 rounded-xl p-4 shadow-lg border border-white/10 hover:border-white/30 transition"
          >
            <div className="relative w-full h-72 rounded-lg overflow-hidden bg-white">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain group-hover:scale-105 transition duration-300"
              />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-white">
              {product.name}
            </h3>

            <p className="text-gray-300">₡{product.price.toLocaleString()}</p>

            <div className="mt-4">
              <button
                className={`w-full py-2 rounded-lg font-semibold ${
                  product.stock <= 0
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-white text-black group-hover:bg-gray-200 transition"
                }`}
                disabled
              >
                {product.stock <= 0 ? "No disponible" : "Disponible"}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
