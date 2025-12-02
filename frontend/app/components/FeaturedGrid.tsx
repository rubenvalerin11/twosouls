import ProductCard from "./ProductCard";

const products = [
  {
    name: "Camisa TwoSouls",
    price: 23000,
    image: "/products/shirt1.png"
  },
  {
    name: "Bandama Twosouls",
    price: 5000,
    image: "/products/pants1.png"
  }
];

export default function FeaturedGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-3xl font-semibold mb-6">Piezas destacadas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((p, i) => (
          <ProductCard key={i} product={p} />
        ))}
      </div>
    </section>
  );
}
