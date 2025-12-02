// backend/routes/adminProductRoutes.js
import express from "express";
import Product from "../models/Product.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas estas rutas están protegidas
router.use(verifyAdmin);

// GET /api/admin/products  → lista completa
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Error obteniendo productos admin:", err);
    res.status(500).json({ message: "Error obteniendo productos" });
  }
});

// POST /api/admin/products → crear
router.post("/", async (req, res) => {
  try {
    const {
      name,
      price,
      description = "",
      imageUrl,
      stock = 0,
      sizes = [],
    } = req.body;

    const product = new Product({
      name,
      price,
      description,
      imageUrl,
      stock,
      sizes,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creando producto:", err);
    res.status(500).json({ message: "Error creando producto" });
  }
});

// PUT /api/admin/products/:id → editar
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Error actualizando producto:", err);
    res.status(500).json({ message: "Error actualizando producto" });
  }
});

// DELETE /api/admin/products/:id → eliminar
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    console.error("Error eliminando producto:", err);
    res.status(500).json({ message: "Error eliminando producto" });
  }
});

export default router;
