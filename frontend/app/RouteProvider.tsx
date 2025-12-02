"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import NewsBar from "@/app/components/NewsBar";

export default function RouteProvider({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && (
        <>
          <NewsBar />
          <Navbar />
        </>
      )}

      {children}

      {!isAdminRoute && <Footer />}
    </>
  );
}
