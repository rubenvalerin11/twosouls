export async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Error al obtener los productos");
    }

    return await res.json();
  } catch (error) {
    console.error("API PRODUCTS ERROR:", error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Error al obtener el producto");
    }

    return await res.json();
  } catch (error) {
    console.error("API PRODUCT ERROR:", error);
    return null;
  }
}
