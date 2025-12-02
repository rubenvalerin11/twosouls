// OPCIONAL – solo si luego quieres sacar el sidebar a componente
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const linkClasses = (href: string) =>
    `block rounded-lg px-3 py-2 text-sm transition ${
      pathname.startsWith(href)
        ? "bg-white text-black font-semibold"
        : "text-white/70 hover:bg-white/10"
    }`;

  return (
    <aside className="w-64 border-r border-white/10 bg-black/80 p-5 flex flex-col">
      <h1 className="text-xl font-black mb-6">TwoSouls · Admin</h1>

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
      </nav>

      <p className="mt-auto text-[11px] text-white/40">
        Vista interna para administración.
      </p>
    </aside>
  );
}
