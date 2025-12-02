"use client";

import { useState } from "react";

export default function NewProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/upload`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    setImage(data.url);
    setUploading(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name,
        price,
        image,
      }),
    });

    if (res.ok) {
      alert("Producto creado");
    } else {
      alert("Error");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", color: "#fff" }}>
      <h2>Nuevo Producto</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {uploading && <p>Subiendo imagen...</p>}

        {image && (
          <img src={image} alt="Preview" style={{ maxWidth: "100%", height: "auto" }} />
        )}

        <button type="submit" style={{ background: "#4f46e5", color: "#fff", padding: "10px" }}>
          Crear Producto
        </button>
      </form>
    </div>
  );
}
