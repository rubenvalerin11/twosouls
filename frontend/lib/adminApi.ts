// frontend/lib/adminApi.ts
import axios from "axios";

const API_URL = "http://localhost:3001/api/admin";

// Axios configurado para ENVIAR la cookie admin_token SIEMPRE
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,  // 🔥 SIN ESTO -> 401
});

// Helper universal: todas las llamadas del admin pasan por aquí
async function adminFetch(endpoint: string, method: string = "GET", body?: any) {
  try {
    const res = await api({
      url: endpoint,
      method,
      data: body,
    });

    return res.data;
  } catch (err: any) {
    console.error("adminFetch ERROR:", err.response?.data || err.message);

    const message = err.response?.data?.message || "Error en el servidor";
    throw new Error(message);
  }
}

// ------------------------------
// PRODUCTS
// ------------------------------
export async function getAdminProducts() {
  return adminFetch("/products");
}

export async function createAdminProduct(data: any) {
  return adminFetch("/products", "POST", data);
}

export async function updateAdminProduct(id: string, data: any) {
  return adminFetch(`/products/${id}`, "PUT", data);
}

export async function deleteAdminProduct(id: string) {
  return adminFetch(`/products/${id}`, "DELETE");
}

// ------------------------------
// ORDERS
// ------------------------------
export async function getAdminOrders() {
  return adminFetch("/orders");
}

export async function getAdminOrderDetail(id: string) {
  return adminFetch(`/orders/${id}`);
}

export async function updateOrderStatus(id: string, status: string) {
  return adminFetch(`/orders/${id}/status`, "PUT", { status });
}

// ------------------------------
// DASHBOARD (usa productos + pedidos)
// ------------------------------
export async function getAdminDashboardData() {
  const [products, orders] = await Promise.all([
    getAdminProducts(),
    getAdminOrders(),
  ]);

  // Podés mapear tus métricas acá si querés
  return {
    products,
    orders,
  };
}
