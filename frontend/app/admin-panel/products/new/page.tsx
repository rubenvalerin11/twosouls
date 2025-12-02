"use client";

import { useState } from "react";

export default function CreateProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Por favor selecciona una imagen");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    // Subir imagen a Cloudinary (via backend)
    const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const uploadData = await uploadRes.json();
    if (!uploadData?.url) {
      alert("Error al subir imagen");
      return;
    }

    const productData = {
      name,
      price,
      image: uploadData.url,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (res.ok) {
      alert("Producto creado ✅");
      setName("");
      setPrice(0);
      setImage(null);
      setPreview("");
    } else {
      alert("Error al crear producto");
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", display: "flex", flexDirection: "column", gap: "1rem" }}>
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
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />

        <input type="file" accept="image/*" onChange={handleImageChange} required />
        {preview && <img src={preview} alt="preview" style={{ width: "100%", borderRadius: "6px" }} />}

        <button type="submit">Guardar producto</button>
      </form>
    </div>
  );
}
