// frontend/app/components/FeaturedGrid.tsx

import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/api";

export default async function FeaturedGrid() {
  const products = await getProducts();

  const featured = products.slice(0, 2); // Los dos primeros como destacados

  return (
    <section className="py-20 px-6">
      <h2 className="text-3xl font-bold mb-10 text-white">Piezas destacadas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {featured.map((p: any) => (
          <Link
            href={`/products/${p._id}`}
            key={p._id}
            className="bg-white rounded-xl p-6 shadow-xl hover:scale-[1.01] transition"
          >
            <div className="relative h-80 w-full mb-4">
              <Image
                src={p.imageUrl}
                alt={p.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-lg font-medium text-black">{p.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
