"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import NavbarCartIcon from "./NavbarCartIcon";
import CartSidebar from "./CartSidebar";
import { useCart } from "@/app/context/CartContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Productos" },
  { href: "/#about", label: "Nosotros" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartOpen, setCartOpen } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-black/10 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/ts-logo.png"
              alt="TwoSouls"
              width={38}
              height={38}
              className="rounded-full border border-black/20"
            />
            <span className="text-[0.75rem] font-semibold uppercase tracking-[0.35em] text-black">
              TwoSouls
            </span>
          </Link>

          {/* Links desktop */}
          <nav className="hidden md:flex items-center gap-6 text-[0.7rem] font-medium uppercase tracking-[0.3em]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black/70 hover:text-black transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5">

            {/* TikTok */}
            <button
              onClick={() => window.open("https://www.tiktok.com/@twosoulscr", "_blank")}
              className="hidden md:flex text-black/70 hover:text-black text-lg"
            >
              <FaTiktok />
            </button>

            {/* Instagram */}
            <button
              onClick={() => window.open("https://www.instagram.com/itwosouls", "_blank")}
              className="hidden md:flex text-black/70 hover:text-black text-lg"
            >
              <FaInstagram />
            </button>

            {/* Cart */}
            <div className="cursor-pointer" onClick={() => setCartOpen(true)}>
              <NavbarCartIcon />
            </div>

            {/* Mobile menu */}
            <button
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-black/20"
              onClick={() => setOpen(!open)}
            >
              <HiMenuAlt3 className="text-xl text-black" />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav className="md:hidden px-4 py-4 bg-white border-t border-black/10">
            <div className="flex flex-col gap-4 text-[0.75rem] font-medium uppercase tracking-[0.3em]">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Cart sidebar */}
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
