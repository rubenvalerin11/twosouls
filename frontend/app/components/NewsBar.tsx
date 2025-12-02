// components/NewsBar.tsx
"use client";

export default function NewsBar() {
  return (
    <div className="w-full bg-black text-[11px] font-medium uppercase tracking-[0.35em] text-white">
      <div className="relative mx-auto flex max-w-6xl overflow-hidden py-2">
        <div className="animate-marquee flex gap-16 whitespace-nowrap">
          <span>TWOSOULS · FIRST DROP· TWOSOULS</span>
          <span>    PAGO CON PAYPAL· STOCK LIMITADO</span>
        
          <span>    ·REAL FAME  ETERNAL BONDS · TWOSOULS</span>
        </div>
      </div>
    </div>
  );
}
