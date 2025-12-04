// frontend/app/products/[id]/page.tsx

import { getProductById } from "@/lib/api";
import Image from "next/image";

export default async function ProductDetail({ params }: any) {
  const product = await getProductById(params.id);

  if (!product) {
    return <div className="text-white p-20">Producto no encontrado.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-10 py-20 px-6 text-white">
      <div className="relative w-full h-96 md:w-1/2">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        <p className="text-xl mb-4">₡{product.price.toLocaleString()}</p>

        <p className="text-gray-300 mb-6">{product.description}</p>

        <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
