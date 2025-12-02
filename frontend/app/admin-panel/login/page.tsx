"use client";

import { useState } from "react";
import useAdminAuth from "@/lib/useAdminAuth";

export default function LoginPage() {
  const { login, loading } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await login(email, password);

    if (!res.ok) {
      setErrorMsg(res.message || "Error");
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <form
        onSubmit={handleLogin}
        className="bg-white/5 p-8 rounded-xl w-[380px] border border-white/10"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">ShopAdmin</h1>

        <label className="block mb-3 text-sm">Email</label>
        <input
          className="w-full px-3 py-2 mb-4 bg-black/40 border border-white/20 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-3 text-sm">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 mb-4 bg-black/40 border border-white/20 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMsg && (
          <p className="text-red-400 text-sm mb-3 text-center">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-2 rounded-lg"
        >
          {loading ? "Ingresando..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
