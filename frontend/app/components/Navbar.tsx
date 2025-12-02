"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaInstagram } from "react-icons/fa";
import NavbarCartIcon from "./NavbarCartIcon";
import CartSidebar from "./CartSidebar";
import { useCart } from "@/app/context/CartContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/#colecciones", label: "Colecciones" },
  { href: "/#about", label: "Nosotros" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems, cartOpen, setCartOpen } = useCart();

  const goInstagram = () => {
    window.open(
      "https://www.instagram.com/itwosouls?igsh=NTB5bWZhdXk0am51&utm_source=qr",
      "_blank"
    );
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f4f3f1]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/ts-logo.png"
              alt="TwoSouls"
              width={34}
              height={34}
              className="rounded-full border border-black/10"
            />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.35em]">
              TwoSouls
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-[0.65rem] font-medium uppercase tracking-[0.3em] md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black/70 transition hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="hidden items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-black/70 hover:text-black md:flex"
              onClick={goInstagram}
            >
              <FaInstagram />
              Instagram
            </button>

            {/* 🛒 CARRITO — AHORA FUNCIONAL */}
            <div
              className="relative cursor-pointer"
              onClick={() => setCartOpen(true)}
            >
              <NavbarCartIcon />
            </div>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/20 md:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              <HiMenuAlt3 className="text-lg" />
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-black/10 bg-[#f4f3f1] px-4 py-3 md:hidden">
            <div className="flex flex-col gap-3 text-[0.7rem] font-medium uppercase tracking-[0.3em]">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-1"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* 🛒 SIDEBAR DEL CARRITO */}
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
