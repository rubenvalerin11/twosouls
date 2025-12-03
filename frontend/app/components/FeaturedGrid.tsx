import ProductCard from "./ProductCard";

const products = [
  {
    name: "TwoSouls Diamonds Black Tee",
    price: 23000,
    image: "https://res.cloudinary.com/dukuc8xqm/image/upload/v1763750371/camisafondonuevo_p0ev9n.png",
  },
  {
    name: "TwoSouls StarShine Bandana",
    price: 5000,
    image: "https://res.cloudinary.com/dukuc8xqm/image/upload/v1763750373/panuelonew_b2gukh.png",
  },
];

export default function FeaturedGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-3xl font-semibold mb-6">Piezas destacadas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
}
