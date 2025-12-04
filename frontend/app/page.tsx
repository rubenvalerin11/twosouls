"use client";

import Hero from "./components/Hero";
import NewsBar from "./components/NewsBar";
import FeaturedGrid from "./components/FeaturedGrid";
import AboutSection from "./components/AboutSection";

export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* Barra superior */}
      <NewsBar />

      {/* Hero principal */}
      <Hero />

      {/* Productos dinámicos */}
      <section className="py-20 px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Colección TwoSouls
        </h2>

        <p className="text-center text-white/60 mb-10">
          Actualmente sin stock, vuelve en enero 2025.
        </p>

        <FeaturedGrid />
      </section>

      {/* Sección editorial */}
      <AboutSection />
    </div>
  );
}
