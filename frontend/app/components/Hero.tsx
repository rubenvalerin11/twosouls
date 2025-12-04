"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden bg-black">
      
      {/* Imagen */}
      <Image
        src="https://res.cloudinary.com/dukuc8xqm/image/upload/v1763750367/camisatwosouls_chas3o.jpg"
        alt="TwoSouls Camisa"
        fill
        priority
        className="object-cover object-center opacity-85 scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Texto */}
      <div className="relative z-20 flex flex-col justify-center h-full px-6 max-w-6xl mx-auto">

        <p className="text-sm uppercase tracking-[0.3em] text-white/70">
          Nuevo Drop
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white max-w-2xl leading-tight">
          REAL FLAME,  
          <span className="block">ETERNAL BONDS</span>
        </h1>

        <p className="mt-4 text-white/80 max-w-md">
          Piezas minimalistas creadas para durar.  
          Inspiradas en la noche, la calle y la escena local.
        </p>

        <div className="flex gap-4 mt-6">
          <a
            href="#productos"
            className="px-6 py-3 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-widest hover:bg-gray-200 transition"
          >
            Ver productos
          </a>

          <a
            href="#about"
            className="px-6 py-3 rounded-full border border-white text-white text-xs font-semibold uppercase tracking-widest hover:bg-white/20 transition"
          >
            Sobre TwoSouls
          </a>
        </div>
      </div>
    </section>
  );
}
