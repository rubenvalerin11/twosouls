// frontend/app/admin-panel/components/SideBar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();

  const linkClasses = (href: string) =>
    `block rounded-lg px-3 py-2 text-sm transition ${
      pathname.startsWith(href)
        ? "bg-white text-black font-semibold"
        : "text-white/70 hover:bg-white/10"
    }`;

  return (
    <aside className="w-64 border-r border-white/10 bg-black/70 p-5">
      <h1 className="text-lg font-bold mb-6">TwoSouls · Admin</h1>

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

      <p className="mt-8 text-[11px] text-white/40">
        Panel interno TwoSouls. Cambios en vivo.
      </p>
    </aside>
  );
}
