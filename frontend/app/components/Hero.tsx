"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] md:h-[95vh] overflow-hidden bg-black">
      
      {/* Imagen de fondo */}
      <Image
        src="https://res.cloudinary.com/dukuc8xqm/image/upload/v1763750367/camisatwosouls_chas3o.jpg"  // ajusta si tu imagen tiene otro nombre
        alt="Camisa TwoSouls"
        fill
        priority
        className="object-cover object-center opacity-90"
      />

      {/* Overlay negro suave */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenido encima */}
      <div className="relative z-20 flex flex-col justify-center h-full px-6 max-w-6xl mx-auto">
        
        <p className="text-sm tracking-[0.3em] uppercase text-white/70 mb-3">
         Disponible ahora
        </p>

        <h1 className="text-4xl md:text-6xl font-bold text-white max-w-xl leading-tight">
          REAL FLAME, ETERNAL BONDS
        </h1>

        <p className="mt-4 text-white/80 max-w-lg">
          Pieza limitadas de TwoSouls inspiradas en la noche, la calle y la escena local.
          
        </p>

        {/* Botones */}
        <div className="flex gap-4 mt-6">
          <a
            href="#productos"
            className="px-6 py-3 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-widest"
          >
            Ver productos
          </a>

          <a
            href="#about"
            className="px-6 py-3 rounded-full border border-white text-white text-xs font-semibold uppercase tracking-widest"
          >
            Sobre TwoSouls
          </a>
        </div>

      </div>

    </section>
  );
}
