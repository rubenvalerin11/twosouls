// frontend/app/page.tsx
import Hero from "./components/Hero";
import NewsBar from "./components/NewsBar";
import FeaturedGrid from "./components/FeaturedGrid";
import AboutSection from "./components/AboutSection";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-black via-[#050507] to-black">
      {/* Barra de anuncios arriba (envíos, drops, etc.) */}
      <NewsBar />

      {/* Hero principal: imagen grande + CTA */}
      <section className="border-b border-white/5">
        <Hero />
      </section>

      {/* Tira de colecciones / categorías */}
      <section className="border-b border-white/5">
        <CollectionStrip />
      </section>

      {/* Grid de productos destacados */}
      <section className="border-b border-white/5">
        <FeaturedGrid />
      </section>

      {/* Sección “Sobre TwoSouls” */}
      <section>
        <AboutSection />
      </section>
    </div>
  );
}
