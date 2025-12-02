"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: any) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(
        "http://localhost:3001/api/admin/auth/login",
        { email, password },
        { withCredentials: true } //  OBLIGATORIO para recibir cookie
      );

      if (res.data.success) {
        router.push("/admin-panel");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err: any) {
      console.log("LOGIN ERROR:", err.response?.data || err);
      setError("Error en el servidor");
    }

    setLoading(false);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-neutral-900 p-6 rounded-xl w-[350px] border border-neutral-800"
      >
        <h1 className="text-xl font-bold mb-4">Admin Two Souls</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 mb-3 bg-neutral-800 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          required
          className="w-full p-3 mb-4 bg-neutral-800 rounded"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded font-semibold"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
