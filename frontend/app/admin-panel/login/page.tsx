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
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3001/api/admin/login",
        {
          email: e.target.email.value,
          password: e.target.password.value,
        },
        { withCredentials: true }
      );

      if (res.data?.success === true) {
        router.push("/admin-panel");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err: any) {
      setError("Error en el servidor");
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-neutral-900 rounded-xl shadow-xl w-[340px]"
      >
        <h1 className="text-2xl font-semibold mb-4">Two Souls — Admin</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 rounded bg-neutral-800"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded bg-neutral-800"
          required
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-white text-black rounded-lg font-semibold"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
