export default function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-neutral-900 bg-black px-4 py-16"
    >
      <div className="mx-auto max-w-4xl space-y-6">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
          SOBRE TWOSOULS
        </p>

        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Una marca nacida de la dualidad.
        </h2>

        <p className="text-sm leading-relaxed text-neutral-400">
          TwoSouls existe para quienes no encajan en una sola versión de sí
          mismos. Diseñamos piezas simples pero con intención: siluetas limpias,
          gráficos mínimos y una paleta pensada para la calle y la noche.
        </p>

        <p className="text-sm leading-relaxed text-neutral-400">
          No seguimos temporadas. Trabajamos por drops en cantidades limitadas,
          para que cada prenda tenga historia. Si algo te gusta, tómalo antes de
          que desaparezca.
        </p>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-12"></div>

    </section>
  );
}
