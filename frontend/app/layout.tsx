import "./globals.css";
import { CartProvider } from "./context/CartContext";
import RouteProvider from "./RouteProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#f4f3f1] text-black flex flex-col">
        <CartProvider>
          <RouteProvider>
            <main className="flex-1">{children}</main>
          </RouteProvider>
        </CartProvider>
      </body>
    </html>
  );
}
