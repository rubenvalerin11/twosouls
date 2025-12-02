"use client";

import React, { useEffect, useState } from "react";
import {
  AdminProduct,
  AdminProductInput,
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from "@/lib/adminApi";

const emptyForm: AdminProductInput = {
  name: "",
  price: 0,
  stock: 0,
  description: "",
  imageUrl: "",
  sizes: [],
};

export default function AdminPanelProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<AdminProductInput>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function loadProducts() {
    try {
      setLoading(true);
      setError(null);
      const data = await getAdminProducts();
      setProducts(data || []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(product: AdminProduct) {
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock ?? 0,
      description: product.description ?? "",
      imageUrl: product.imageUrl,
      sizes: product.sizes ?? [],
    });
    setEditingId(product._id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload: AdminProductInput = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        sizes:
          typeof form.sizes === "string"
            ? (form.sizes as any)
                .split(",")
                .map((s: string) => s.trim())
                .filter(Boolean)
            : form.sizes ?? [],
      };

      if (!editingId) {
        await createAdminProduct(payload);
      } else {
        await updateAdminProduct(editingId, payload);
      }

      setShowForm(false);
      await loadProducts();
    } catch (err) {
      console.error(err);
      setError("Error guardando el producto.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) {
      return;
    }
    try {
      await deleteAdminProduct(id);
      await loadProducts();
    } catch (err) {
      console.error(err);
      alert("Error eliminando el producto.");
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Productos</h1>
          <p className="text-sm text-white/60">
            Gestiona el catálogo que ve tu cliente en la tienda.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-200 transition"
        >
          + Nuevo producto
        </button>
      </header>

      {loading && (
        <div className="rounded-lg border border-white/10 bg-black/40 px-4 py-6 text-sm text-white/70">
          Cargando productos...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg bg-red-950/70 border border-red-700/70 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="rounded-lg border border-white/10 bg-black/40 px-4 py-6 text-sm text-white/70">
          No hay productos registrados todavía.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-white/60">
              <tr>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Tallas</th>
                <th className="px-4 py-3">Actualizado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p._id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.imageUrl && (
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="h-10 w-10 rounded-md object-cover border border-white/10"
                        />
                      )}
                      <div>
                        <div className="font-medium">{p.name}</div>
                        {p.description && (
                          <div className="text-xs text-white/50 line-clamp-1">
                            {p.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    ₡ {Number(p.price).toLocaleString("es-CR")}
                  </td>
                  <td className="px-4 py-3">
                    {p.stock <= 0 ? (
                      <span className="text-red-400 text-xs font-semibold">
                        Sin stock
                      </span>
                    ) : (
                      p.stock
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-white/70">
                    {p.sizes && p.sizes.length > 0
                      ? p.sizes.join(", ")
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-white/60">
                    {p.updatedAt
                      ? new Date(p.updatedAt).toLocaleString("es-CR")
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-white/20"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-200 hover:bg-red-500/30"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* FORMULARIO MODAL SIMPLE */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="w-full max-w-lg bg-[#050505] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {editingId ? "Editar producto" : "Nuevo producto"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-white/60 hover:text-white text-sm"
              >
                Cerrar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block mb-1 text-white/70">Nombre</label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full rounded-lg border border-white/20 bg-black px-3 py-2"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-white/70">Precio (₡)</label>
                  <input
                    type="number"
                    min={0}
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: Number(e.target.value) }))
                    }
                    className="w-full rounded-lg border border-white/20 bg-black px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-white/70">Stock</label>
                  <input
                    type="number"
                    min={0}
                    value={form.stock}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, stock: Number(e.target.value) }))
                    }
                    className="w-full rounded-lg border border-white/20 bg-black px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-white/70">
                  Tallas (separadas por coma)
                </label>
                <input
                  value={
                    Array.isArray(form.sizes) ? form.sizes.join(", ") : ""
                  }
                  onChange={(e) =>
                    setForm((f) => ({ ...f, sizes: e.target.value as any }))
                  }
                  className="w-full rounded-lg border border-white/20 bg-black px-3 py-2"
                />
              </div>

              <div>
                <label className="block mb-1 text-white/70">Imagen (URL)</label>
                <input
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, imageUrl: e.target.value }))
                  }
                  className="w-full rounded-lg border border-white/20 bg-black px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-white/70">
                  Descripción
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="w-full rounded-lg border border-white/20 bg-black px-3 py-2"
                  rows={3}
                />
              </div>

              {error && (
                <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/40 rounded-md px-3 py-2">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg border border-white/20 text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold disabled:opacity-60"
                >
                  {saving
                    ? "Guardando..."
                    : editingId
                    ? "Guardar cambios"
                    : "Crear producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
