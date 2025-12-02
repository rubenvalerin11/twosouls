export const metadata = {
  title: "Two Souls",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "sans-serif", backgroundColor: "#fff", color: "#000" }}>
        {children}
      </body>
    </html>
  );
}
