"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useAdminAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        return { ok: false, message: "Credenciales inválidas" };
      }

      // éxito → ir al panel
      router.push("/admin-panel");
      return { ok: true };
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      return { ok: false, message: "Error de servidor" };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
