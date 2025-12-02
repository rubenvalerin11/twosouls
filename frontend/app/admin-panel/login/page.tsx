"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Credenciales inválidas.");
        return;
      }

      router.push("/admin-panel");
    } catch (err) {
      console.error(err);
      setError("Error de conexión.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/5 border border-white/20 p-10 rounded-xl w-[420px] shadow-xl">

        <h1 className="text-center text-3xl font-bold mb-2">ShopAdmin</h1>
        <p className="text-center text-sm text-white/60 mb-8">
          Admin Panel · TwoSouls
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-2 rounded-lg mt-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-[11px] text-center mt-5 text-white/40">
          Usa las mismas credenciales del backend (ENV).
        </p>
      </div>
    </div>
  );
}
