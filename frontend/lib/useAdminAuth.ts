"use client";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function loginAdmin(email: string, password: string) {
  try {
    console.log("🔐 Login admin payload:", { email, password });

    const res = await fetch(`${API_BASE}/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    console.log("🔐 Login admin status:", res.status);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("🔐 Login admin body:", text);
      return { success: false };
    }

    const data = await res.json().catch(() => null);
    console.log("🔐 Login admin data:", data);
    return data ?? { success: false };
  } catch (error) {
    console.error("🔐 LOGIN ERROR:", error);
    return { success: false };
  }
}

export async function logoutAdmin() {
  try {
    await fetch(`${API_BASE}/admin/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("🔐 LOGOUT ERROR:", error);
  }
}
