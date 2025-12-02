"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Productos" }
];

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="container-page flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Panel Admin
            </span>
            <span className="text-xs text-slate-500">
              TwoSouls · Sistema de tienda
            </span>
          </div>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-slate-100"
          >
            Ver tienda →
          </Link>
        </div>
      </div>

      <div className="container-page flex gap-8">
        <aside className="hidden w-60 flex-none flex-col gap-2 sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "rounded-xl px-4 py-2 text-sm transition",
                pathname === item.href
                  ? "bg-slate-800 text-slate-50 shadow-lg shadow-black/40"
                  : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </aside>

        <main className="flex-1 space-y-6">{children}</main>
      </div>
    </div>
  );
}
