import Image from "next/image";

export default function ProductCard({ product, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="border rounded-xl overflow-hidden bg-white cursor-pointer hover:shadow-xl transition"
    >
      {/* Imagen */}
      <div className="relative w-full h-72">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <h2 className="font-medium text-neutral-900">{product.name}</h2>

        <p className="text-neutral-500 text-sm mt-1">
          {product.name.includes("Pañuelo") ? "Única" : product.sizes?.join(" · ")}
        </p>

        <p className="font-semibold mt-2">₡{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
}
