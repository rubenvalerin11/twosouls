"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f4f3f1] pointer-events-none">
      <Image
        src="https://res.cloudinary.com/dukuc8xqm/image/upload/v1763750371/ts-logo_jzjqvw.png"
        alt="TwoSouls Logo"
        width={140}
        height={140}
        className="opacity-90 animate-pulse"
        priority
      />
    </div>
  );
}
