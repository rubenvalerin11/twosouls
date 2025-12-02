// frontend/lib/adminApi.ts
// Utilidades para consumir el backend de administración desde el panel Next.js

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:3001/api";

type FetchOptions = RequestInit & { skipAuthRedirect?: boolean };

async function adminFetch<T = any>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include", // MUY IMPORTANTE: envía la cookie admin_token
    cache: "no-store",
  });

  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const err: any = new Error(
      data?.message || data?.error || `Admin API error (${res.status})`
    );
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data as T;
}

/* ========= TIPOS MUY LAXOS (para no romper nada) ========= */

export type AdminProduct = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
};

export type AdminOrder = {
  _id: string;
  total?: number;
  totalAmount?: number;
  status?: string;
  createdAt?: string;
  user?: {
    name?: string;
    email?: string;
  };
  items?: Array<{
    productId?: string;
    name?: string;
    quantity?: number;
    price?: number;
  }>;
  [key: string]: any;
};

export type DashboardMetrics = {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalProducts: number;
  lastOrders: AdminOrder[];
};

/* ================== AUTH ADMIN ================== */

export async function loginAdmin(email: string, password: string) {
  // Backend debe crear la cookie httpOnly "admin_token"
  return adminFetch("/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function logoutAdmin() {
  return adminFetch("/admin/auth/logout", {
    method: "POST",
  });
}

export async function getAdminSession() {
  // Úsalo si tienes un endpoint tipo /admin/auth/me
  return adminFetch("/admin/auth/me", {
    method: "GET",
  });
}

/* ================== PRODUCTOS ================== */

export async function getAdminProducts(): Promise<AdminProduct[]> {
  const products = await adminFetch<AdminProduct[]>("/admin/products", {
    method: "GET",
  });

  return Array.isArray(products) ? products : [];
}

export async function getAdminProductById(
  id: string
): Promise<AdminProduct | null> {
  if (!id) return null;
  return adminFetch<AdminProduct>(`/admin/products/${id}`, {
    method: "GET",
  });
}

export async function createAdminProduct(
  payload: Partial<AdminProduct>
): Promise<AdminProduct> {
  return adminFetch<AdminProduct>("/admin/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateAdminProduct(
  id: string,
  payload: Partial<AdminProduct>
): Promise<AdminProduct> {
  return adminFetch<AdminProduct>(`/admin/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminProduct(id: string): Promise<{ ok: boolean }> {
  return adminFetch<{ ok: boolean }>(`/admin/products/${id}`, {
    method: "DELETE",
  });
}

/* ================== PEDIDOS ================== */

export async function getAdminOrders(): Promise<AdminOrder[]> {
  const orders = await adminFetch<AdminOrder[]>("/admin/orders", {
    method: "GET",
  });

  return Array.isArray(orders) ? orders : [];
}

export async function getAdminOrderById(
  id: string
): Promise<AdminOrder | null> {
  if (!id) return null;
  return adminFetch<AdminOrder>(`/admin/orders/${id}`, {
    method: "GET",
  });
}

export async function updateAdminOrderStatus(
  id: string,
  status: string
): Promise<AdminOrder> {
  return adminFetch<AdminOrder>(`/admin/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

/* ================== DASHBOARD MÉTRICAS ================== */

export async function getAdminDashboardData(): Promise<DashboardMetrics> {
  // Si /admin/orders o /admin/products devuelven 401,
  // dejamos que el caller redirija al login.
  const [products, orders] = await Promise.all([
    getAdminProducts().catch((err) => {
      (err as any).from = "products";
      throw err;
    }),
    getAdminOrders().catch((err) => {
      (err as any).from = "orders";
      throw err;
    }),
  ]);

  const safeOrders = Array.isArray(orders) ? orders : [];
  const safeProducts = Array.isArray(products) ? products : [];

  const totalOrders = safeOrders.length;

  const totalRevenue = safeOrders.reduce((sum, order) => {
    const value =
      typeof order.totalAmount === "number"
        ? order.totalAmount
        : typeof order.total === "number"
        ? order.total
        : 0;
    return sum + value;
  }, 0);

  const pendingOrders = safeOrders.filter((o) => {
    const s = (o.status || "").toLowerCase();
    return s === "pending" || s === "pendiente";
  }).length;

  const totalProducts = safeProducts.length;

  const lastOrders = safeOrders
    .slice()
    .sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    })
    .slice(0, 5);

  return {
    totalOrders,
    totalRevenue,
    pendingOrders,
    totalProducts,
    lastOrders,
  };
}
