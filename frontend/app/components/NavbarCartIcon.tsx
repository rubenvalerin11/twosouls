"use client";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCart } from "@/app/context/CartContext";

export default function NavbarCartIcon() {
  const { totalItems } = useCart();

  return (
    <div className="relative flex items-center justify-center">
      <HiOutlineShoppingBag className="text-2xl text-black" />

      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-1 py-[1px] rounded-full">
          {totalItems}
        </span>
      )}
    </div>
  );
}
