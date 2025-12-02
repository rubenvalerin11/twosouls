"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 🔥 NECESARIO para httpOnly cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Credenciales incorrectas");
        return;
      }

      // 🔁 Redireccionar si todo OK
      router.push("/admin-panel/dashboard");
    } catch (err) {
      setError("Error del servidor");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", color: "#fff" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "5px",
            background: "#4f46e5",
            color: "#fff",
            border: "none",
          }}
        >
          Ingresar
        </button>
        {error && <p style={{ color: "tomato" }}>{error}</p>}
      </form>
    </div>
  );
}
