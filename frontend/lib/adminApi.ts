// frontend/lib/adminApi.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// ───────── Tipos base ─────────

export interface AdminProduct {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl: string;
  sizes?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminOrderItem {
  productId?: string;
  name: string;
  size?: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface AdminOrder {
  _id: string;
  email?: string;
  status: "pending" | "paid" | "shipped" | "cancelled";
  items: AdminOrderItem[];
  total: number;
  createdAt?: string;
  updatedAt?: string;
  shippingAddress?: {
    fullName?: string;
    address?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    phone?: string;
  };
}

// ───────── Helper general ─────────

async function adminFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Admin API ERROR:", res.status, text);
    throw new Error("API_ERROR");
  }

  return res.json();
}

// ───────── Productos (para métricas / futuro CRUD) ─────────

export async function getAdminProducts(): Promise<AdminProduct[]> {
  return adminFetch("/admin/products");
}

// ───────── Órdenes ─────────

export async function getAdminOrders(): Promise<AdminOrder[]> {
  return adminFetch("/admin/orders");
}

export async function getAdminOrderById(id: string): Promise<AdminOrder> {
  return adminFetch(`/admin/orders/${id}`);
}

export async function updateAdminOrderStatus(
  id: string,
  status: "pending" | "paid" | "shipped" | "cancelled"
): Promise<AdminOrder> {
  return adminFetch(`/admin/orders/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

// ───────── Métricas para el dashboard ─────────

export interface AdminDashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  pendingOrders: number;
  shippedOrders: number;
  cancelledOrders: number;
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const [orders, products] = await Promise.all([
    getAdminOrders(),
    getAdminProducts(),
  ]);

  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const shippedOrders = orders.filter((o) => o.status === "shipped").length;
  const cancelledOrders = orders.filter((o) => o.status === "cancelled").length;
  const totalProducts = products.length;

  return {
    totalRevenue,
    totalOrders,
    totalProducts,
    pendingOrders,
    shippedOrders,
    cancelledOrders,
  };
}
