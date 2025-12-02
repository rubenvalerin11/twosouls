export async function fetchProducts() {
  try {
    const res = await fetch("http://localhost:3001/api/products", {
      cache: "no-store",
    });

    if (!res.ok) return [];

    return await res.json();
  } catch (err) {
    console.error("PRODUCTS ERROR:", err);
    return [];
  }
}
