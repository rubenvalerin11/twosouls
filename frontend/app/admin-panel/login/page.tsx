"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3001/api/admin/login",
        {
          email: e.target.email.value,
          password: e.target.password.value,
        },
        { withCredentials: true }
      );

      if (res.data.success === true) {
        router.push("/admin-panel");
      } else {
        setError("Credenciales incorrectas");
      }

    } catch (err) {
      setError("Error en el servidor");
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="w-[340px] p-6 bg-neutral-900 border border-neutral-800 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-semibold mb-4">Admin Two Souls</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 rounded bg-neutral-800 outline-none"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded bg-neutral-800 outline-none"
          required
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          className="w-full py-3 bg-white text-black rounded-lg font-semibold"
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
