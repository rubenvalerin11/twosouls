"use client";

import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-10 px-6">

      {/* TÍTULO GENERAL */}
      <h2 className="text-center text-sm font-semibold tracking-[0.25em] uppercase mb-10">
        Términos & Condiciones
      </h2>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center md:text-left">

        {/* ENVÍOS */}
        <div className="space-y-2">
          <h3 className="text-xs tracking-[0.25em] uppercase mb-2">Envíos</h3>
          <p className="text-sm text-white/80">
            Los envíos tienen un plazo aproximado de <b>24 a 72 horas</b> hábiles dentro de Costa Rica.
          </p>

          {/* LINK LIMPIO */}
          <p
            onClick={() => window.open("/terminos", "_blank")}
            className="text-xs text-white cursor-pointer underline hover:text-white/80"
          >
            • Políticas de privacidad / uso / cookies
          </p>
        </div>

        {/* DEVOLUCIONES */}
        <div className="space-y-2">
          <h3 className="text-xs tracking-[0.25em] uppercase mb-2">Devoluciones</h3>
          <p className="text-sm text-white/80">
            Para cambios de talla o producto, contáctanos vía <b>WhatsApp</b>.
          </p>

          <p
            onClick={() => window.open("/devoluciones", "_blank")}
            className="text-xs text-white cursor-pointer underline hover:text-white/80"
          >
            • Reglas de devolución
          </p>
        </div>

        {/* GARANTÍAS — OPTIMIZADA SIN LINK */}
        <div className="space-y-2">
          <h3 className="text-xs tracking-[0.25em] uppercase mb-2">Garantías</h3>
          <p className="text-sm text-white/80">
            Tienes <b>30 días naturales</b> de garantía por defectos de fábrica.
          </p>

          {/* ❗ ELIMINADO EL LINK VACÍO PARA QUE NO ROMPA EL DISEÑO */}
          {/* Ya no aparece el párrafo vacío que generaba espacio raro */}
        </div>

      </div>

      {/* LÍNEA DIVISORIA */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mt-16 mb-10"></div>

      {/* NEWSLETTER + INSTAGRAM */}
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-xs tracking-[0.25em] uppercase mb-4">Suscríbete</h3>

        <div className="flex justify-center gap-4">
          <input 
            type="email"
            placeholder="Correo electrónico"
            className="bg-transparent border border-white/40 px-4 py-2 text-sm w-64 outline-none"
          />
          <button className="bg-white text-black px-6 py-2 text-xs tracking-widest uppercase rounded-full">
            Enviar
          </button>
        </div>

        {/* Instagram */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() =>
              window.open("https://www.instagram.com/itwosouls/", "_blank")
            }
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <FaInstagram /> Instagram
          </button>
        </div>

        {/* COPYRIGHT */}
        <p className="text-white/40 text-xs mt-6">
          © 2025 TwoSouls. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
