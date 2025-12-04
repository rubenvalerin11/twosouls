"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function FiltersSidebar() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenSection(openSection === key ? null : key);
  };

  return (
    <aside className="w-full md:w-64 bg-black/40 border border-white/10 rounded-xl p-5 text-white space-y-6 sticky top-24 h-fit backdrop-blur-xl">
      
      {/* Título */}
      <h2 className="text-lg font-semibold tracking-wide">Filtros</h2>

      {/* Tallas */}
      <div>
        <button
          onClick={() => toggle("tallas")}
          className="flex justify-between items-center w-full text-left py-2 text-sm font-medium"
        >
          Tallas
          <FiChevronDown
            className={`transition-transform ${
              openSection === "tallas" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSection === "tallas" && (
          <div className="pl-2 mt-2 space-y-2 text-sm text-white/80">
            <p>S / Small</p>
            <p>M / Medium</p>
            <p>L / Large</p>
            <p>XL / Extra Large</p>
          </div>
        )}
      </div>

      {/* Materiales */}
      <div>
        <button
          onClick={() => toggle("materiales")}
          className="flex justify-between items-center w-full text-left py-2 text-sm font-medium"
        >
          Materiales
          <FiChevronDown
            className={`transition-transform ${
              openSection === "materiales" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSection === "materiales" && (
          <div className="pl-2 mt-2 space-y-2 text-sm text-white/80">
            <p>Algodón 100%</p>
            <p>Edición limitada premium</p>
            <p>Estampado de alta calidad</p>
          </div>
        )}
      </div>

      {/* Colecciones */}
      <div>
        <button
          onClick={() => toggle("coleccion")}
          className="flex justify-between items-center w-full text-left py-2 text-sm font-medium"
        >
          Colecciones
          <FiChevronDown
            className={`transition-transform ${
              openSection === "coleccion" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSection === "coleccion" && (
          <div className="pl-2 mt-2 space-y-2 text-sm text-white/80">
            <p>Real Fame Eternal Bonds</p>
            <p>First Drop</p>
            <p>Próximamente</p>
          </div>
        )}
      </div>
    </aside>
  );
}
