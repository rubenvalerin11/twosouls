import { getProducts } from "@/lib/api";
import ProductCard from "../components/ProductCard";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="w-full bg-black min-h-screen text-white pt-20 px-6">
      <h1 className="text-4xl font-bold mb-10">Colección TwoSouls</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
