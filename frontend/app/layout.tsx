import "./globals.css";

export const metadata = {
  title: "Two Souls",
  description: "Sitio oficial de Two Souls",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
