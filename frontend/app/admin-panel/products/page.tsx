"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const PRODUCTS_URL = "http://localhost:3001/api/admin/products";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "TU_UPLOAD_PRESET";

type Product = {
  _id?: string;
  name: string;
  price: number;
  active: boolean;
  images: string[];
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Product>({
    name: "",
    price: 0,
    active: true,
    images: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(PRODUCTS_URL, { withCredentials: true });
        setProducts(res.data.products ?? res.data ?? []);
      } catch (e) {
        console.error("Error obteniendo productos", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleUploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.secure_url) {
      setForm((prev) => ({ ...prev, images: [...prev.images, data.secure_url] }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (form._id) {
        // update
        const res = await axios.put(`${PRODUCTS_URL}/${form._id}`, form, {
          withCredentials: true,
        });
        const updated = res.data.product ?? res.data;
        setProducts((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p))
        );
      } else {
        // create
        const res = await axios.post(PRODUCTS_URL, form, {
          withCredentials: true,
        });
        const created = res.data.product ?? res.data;
        setProducts((prev) => [created, ...prev]);
      }
      setShowForm(false);
      setForm({ name: "", price: 0, active: true, images: [] });
    } catch (e) {
      console.error("Error guardando producto", e);
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (p: Product) => {
    setForm(p);
    setShowForm(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Productos</h1>
          <p className="text-neutral-400 text-sm">
            Gestiona el catálogo de Two Souls.
          </p>
        </div>
        <button
          onClick={() => {
            setForm({ name: "", price: 0, active: true, images: [] });
            setShowForm(true);
          }}
          className="px-4 py-2 text-xs rounded-lg bg-white text-black font-semibold"
        >
          Nuevo producto
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-3">
          <div className="flex gap-3">
            <input
              className="flex-1 bg-neutral-800 rounded-lg px-3 py-2 text-sm outline-none"
              placeholder="Nombre del producto"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="number"
              className="w-32 bg-neutral-800 rounded-lg px-3 py-2 text-sm outline-none"
              placeholder="Precio"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <input
              id="active"
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            <label htmlFor="active" className="text-neutral-300">
              Producto activo
            </label>
          </div>

          {/* IMÁGENES */}
          <div className="space-y-2">
            <p className="text-xs text-neutral-400">Imágenes (Cloudinary)</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUploadImage(file);
              }}
              className="text-xs"
            />
            <div className="flex gap-2 flex-wrap">
              {form.images.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="preview"
                  className="w-16 h-16 object-cover rounded-lg border border-neutral-800"
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 text-xs">
            <button
              onClick={() => setShowForm(false)}
              className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700"
            >
              Cancelar
            </button>
            <button
              disabled={saving}
              onClick={handleSave}
              className="px-3 py-2 rounded-lg bg-white text-black font-semibold"
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      )}

      {/* LISTA */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-neutral-500 text-sm">
            Cargando productos...
          </div>
        ) : products.length === 0 ? (
          <div className="p-6 text-center text-neutral-500 text-sm">
            No hay productos registrados.
          </div>
        ) : (
          <table className="w-full text-xs">
            <thead className="bg-neutral-950 text-neutral-400">
              <tr>
                <th className="text-left px-3 py-2">Producto</th>
                <th className="text-left px-3 py-2">Precio</th>
                <th className="text-left px-3 py-2">Estado</th>
                <th className="text-left px-3 py-2">Imágenes</th>
                <th className="text-right px-3 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t border-neutral-800">
                  <td className="px-3 py-2">{p.name}</td>
                  <td className="px-3 py-2">
                    ₡{p.price.toLocaleString("es-CR")}
                  </td>
                  <td className="px-3 py-2">
                    <span className="px-2 py-1 rounded-full bg-neutral-800 border border-neutral-700">
                      {p.active ? "Activo" : "Oculto"}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    {p.images?.length ?? 0} img
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      onClick={() => startEdit(p)}
                      className="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
