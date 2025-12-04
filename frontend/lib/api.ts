// frontend/lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function getProducts() {
  const res = await fetch(`${API_URL}/products`, { cache: "no-store" });
  if (!res.ok) {
    console.error("❌ Error al cargar productos desde API");
    return [];
  }
  return res.json();
}

export async function getProductById(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}
