// frontend/lib/adminApi.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// TIPOS
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

export interface AdminProductInput {
  name: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl: string;
  sizes?: string[];
}

export interface AdminOrderItem {
  id: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface AdminOrder {
  _id: string;
  email?: string;
  customer?: any;
  items: AdminOrderItem[];
  total: number;
  status: string; // "pending", "paid", "shipped", "cancelled"
  createdAt?: string;
}

// Helper interno
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

// ───────────── PRODUCTOS ─────────────

export async function getAdminProducts(): Promise<AdminProduct[]> {
  return adminFetch("/admin/products");
}

export async function createAdminProduct(
  data: AdminProductInput
): Promise<AdminProduct> {
  return adminFetch("/admin/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAdminProduct(
  id: string,
  data: Partial<AdminProductInput>
): Promise<AdminProduct> {
  return adminFetch(`/admin/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminProduct(id: string): Promise<{ message: string }> {
  return adminFetch(`/admin/products/${id}`, {
    method: "DELETE",
  });
}

// ───────────── ÓRDENES ─────────────

export async function getAdminOrders(): Promise<AdminOrder[]> {
  return adminFetch("/admin/orders");
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
