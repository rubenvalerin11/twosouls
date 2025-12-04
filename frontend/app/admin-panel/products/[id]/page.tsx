// frontend/app/products/[id]/page.tsx
import { getProductById } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function ProductDetail({ params }: any) {
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <div className="text-white p-20">Producto no encontrado.</div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="w-full min-h-screen bg-black text-white px-6 md:px-20 py-10">

      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-400 mb-5">
        <Link href="/" className="hover:text-white transition">Home</Link>
        {" / "}
        <Link href="/products" className="hover:text-white transition">Productos</Link>
        {" / "}
        <span className="text-gray-200">{product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-16">

        {/* IMAGEN GRANDE TIPO BERSHKA */}
        <div className="relative w-full md:w-1/2 h-[500px] md:h-[650px]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-lg shadow-lg"
            priority
          />
        </div>

        {/* SIDEBAR DERECHO */}
        <div className="md:w-1/2 flex flex-col">

          <p className="uppercase tracking-widest text-xs text-gray-400 mb-2">
            TWO SOULS – DROP 1
          </p>

          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          <p className="text-xl font-semibold mb-6">
            ₡{product.price.toLocaleString()}
          </p>

          {/* Tallas ✦ SOLO VISUAL */}
          <div>
            <p className="uppercase text-xs text-gray-400 mb-2">Talla</p>
            <div className="flex gap-3">
              {["S", "M", "L", "XL"].map((t) => (
                <button
                  key={t}
                  className="px-4 py-2 border border-gray-600 rounded-full hover:border-white transition"
                  disabled
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Estado del stock */}
          <div className="mt-6">
            {isOutOfStock ? (
              <button
                className="w-full py-4 bg-gray-800 text-gray-400 font-semibold rounded-lg cursor-not-allowed"
                disabled
              >
                No disponible
              </button>
            ) : (
              <button
                className="w-full py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
                disabled
              >
                Añadir al carrito (deshabilitado temporalmente)
              </button>
            )}
          </div>

          {/* Animación tipo Bershka en "Composición y cuidados" */}
          <div className="mt-10">
            <button className="flex justify-between w-full py-4 border-b border-gray-700 text-left group">
              <span className="font-medium group-hover:text-white transition">
                Composición, cuidados y origen
              </span>

              {/* Flecha con animación */}
              <span className="animate-pulse text-gray-400 group-hover:text-white">
                ▶
              </span>
            </button>

            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              {product.description || "Producto de colección TwoSouls con materiales premium."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
