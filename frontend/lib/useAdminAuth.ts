export async function login(email: string, password: string) {
  try {
    const res = await fetch("http://localhost:3001/api/admin/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    return {
      ok: res.ok,
      ...data,
    };
  } catch (err) {
    console.error("Login error:", err);
    return { ok: false, message: "Error de conexión" };
  }
}
