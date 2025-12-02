"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isLogin = pathname === "/admin-panel/login";

  // Si estamos en /admin-panel/login, no mostrar sidebar, solo la página
  if (isLogin) {
    return <>{children}</>;
  }

  const linkClasses = (href: string) =>
    `block rounded-lg px-3 py-2 text-sm transition ${
      pathname.startsWith(href)
        ? "bg-white text-black font-semibold"
        : "text-white/70 hover:bg-white/10"
    }`;

  return (
    <div className="min-h-screen flex bg-[#050505] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/80 p-5 flex flex-col">
        <button
          onClick={() => router.push("/admin-panel")}
          className="text-left mb-6"
        >
          <h1 className="text-xl font-black tracking-tight">
            TwoSouls <span className="text-white/50">Admin</span>
          </h1>
          <p className="text-xs text-white/40 mt-1">
            Panel interno tipo Shopify.
          </p>
        </button>

        <nav className="space-y-1">
          <Link href="/admin-panel" className={linkClasses("/admin-panel")}>
            Dashboard
          </Link>

          <Link
            href="/admin-panel/products"
            className={linkClasses("/admin-panel/products")}
          >
            Productos
          </Link>

          <Link
            href="/admin-panel/orders"
            className={linkClasses("/admin-panel/orders")}
          >
            Pedidos
          </Link>

          <Link
            href="/admin-panel/customers"
            className={linkClasses("/admin-panel/customers")}
          >
            Clientes
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10 text-xs text-white/40">
          <p>Los cambios afectan la tienda en vivo.</p>
          <p className="mt-1">Versión beta · TwoSouls</p>
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 min-h-screen bg-gradient-to-b from-[#050505] to-black p-8">
        {children}
      </main>
    </div>
  );
}
