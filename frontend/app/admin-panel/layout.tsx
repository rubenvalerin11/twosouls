export const metadata = {
  title: "Panel Admin | Two Souls",
};

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#0f0f0f",
          color: "#ffffff",
          margin: 0,
          padding: "2rem",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ marginBottom: "2rem", color: "#4f46e5" }}>Panel Administrativo</h1>
        <main>{children}</main>
      </body>
    </html>
  );
}
