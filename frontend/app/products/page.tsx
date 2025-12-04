// frontend/app/products/page.tsx

import { getProducts } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="py-20 px-6 text-white">
      <h1 className="text-3xl font-bold mb-10">Catálogo</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {products.map((p: any) => (
          <Link
            href={`/products/${p._id}`}
            key={p._id}
            className="bg-white rounded-xl p-6 shadow-xl hover:scale-105 transition transform"
          >
            <div className="relative h-64 w-full mb-4">
              <Image
                src={p.imageUrl}
                alt={p.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <h3 className="text-lg font-semibold text-black">{p.name}</h3>
            <p className="text-gray-700">₡{p.price.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
