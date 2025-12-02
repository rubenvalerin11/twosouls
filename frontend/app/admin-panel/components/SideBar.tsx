"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/admin-panel" },
    { name: "Productos", path: "/admin-panel/products" },
    { name: "Pedidos", path: "/admin-panel/orders" },
  ];

  return (
    <nav className="h-full flex flex-col p-4 select-none">
      <h2 className="text-lg font-bold mb-6">Two Souls</h2>

      <ul className="flex flex-col gap-2">
        {menu.map((item) => {
          const active = pathname === item.path;

          return (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block px-3 py-2 rounded-lg transition ${
                  active
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-400 hover:bg-neutral-900"
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
