"use client";

import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 pt-20 pb-14">

      {/* ========================================================= */}
      {/*  SECCIÓN NEWSLETTER (ESTILO BERSHKA) */}
      {/* ========================================================= */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-3xl font-semibold tracking-wide uppercase mb-3">
          Suscríbete a nuestra Newsletter
        </h2>

        <p className="text-white/70 mb-10">
          ¡Sé el primero en recibir nuevas colecciones, actualizaciones y noticias exclusivas!
        </p>

        <div className="flex justify-center gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="bg-white/5 border border-white/20 px-4 py-3 text-sm w-72 outline-none"
          />
          <button className="bg-white text-black px-6 py-3 text-xs tracking-widest uppercase rounded-full">
            Suscribirse
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/*  COLUMNAS FUSIONADAS */}
      {/* ========================================================= */}

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-14 text-sm text-white/80 mt-10">

        {/* ================= AYUDA ================= */}
        <div>
          <h4 className="font-semibold text-white mb-3 text-lg">¿Necesitas ayuda?</h4>

          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-white underline">Envíos — 24 a 72 horas hábiles</li>
            <li className="cursor-pointer hover:text-white underline">Cambios de talla / WhatsApp</li>
            <li className="cursor-pointer hover:text-white underline">Garantía — 30 días naturales</li>

            <li
              onClick={() => window.open("/devoluciones", "_blank")}
              className="cursor-pointer hover:text-white underline"
            >
              Reglas de devolución
            </li>

            <li
              onClick={() => window.open("/terminos", "_blank")}
              className="cursor-pointer hover:text-white underline"
            >
              Políticas de privacidad / uso / cookies
            </li>
          </ul>
        </div>

        {/* ================= SOBRE TWOSOULS ================= */}
        <div>
          <h4 className="font-semibold text-white mb-3 text-lg">We are TwoSouls</h4>

          <ul className="space-y-2">
            <li>Streetwear limitado</li>
            <li>Sostenibilidad</li>
            <li>Real Fame Eternal Bonds</li>
          
          </ul>
        </div>

        {/* ================= TE PUEDE INTERESAR ================= */}
        <div>
          <h4 className="font-semibold text-white mb-3 text-lg">Te puede interesar</h4>

          <ul className="space-y-2">
            <li>Camisetas</li>
            <li>Bandanas</li>
            <li>Accesorios</li>
         
          </ul>
        </div>
      </div>

      {/* ========================================================= */}
      {/*  ICONOS DE REDES SOCIALES (Instagram + TikTok) */}
      {/* ========================================================= */}

      <div className="text-center mt-16">
        <div className="flex justify-center gap-6">
          <FaInstagram
            size={28}
            className="cursor-pointer text-white/80 hover:text-white transition"
            onClick={() => window.open("https://www.instagram.com/itwosouls/", "_blank")}
          />
          <FaTiktok
            size={28}
            className="cursor-pointer text-white/80 hover:text-white transition"
            onClick={() =>
              window.open("https://www.tiktok.com/@twosoulscr?is_from_webapp=1&sender_device=pc", "_blank")
            }
          />
        </div>

        <p className="text-white/40 text-xs mt-6">
          © 2025 TwoSouls. Todos los derechos reservados. 
        </p>

        <p className="text-white/40 text-xs mt-2">
          Design by <b>Ruben Valerin</b>.
        </p>
      </div>
    </footer>
  );
}
