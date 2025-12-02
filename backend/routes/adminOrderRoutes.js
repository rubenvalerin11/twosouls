// backend/routes/adminOrderRoutes.js
import express from "express";
import Order from "../models/Order.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyAdmin);

// GET /api/admin/orders → lista
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error obteniendo órdenes:", err);
    res.status(500).json({ message: "Error obteniendo órdenes" });
  }
});

// PUT /api/admin/orders/:id/status → cambiar estado
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body; // "pending", "paid", "shipped", "cancelled"
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    console.error("Error actualizando estado:", err);
    res.status(500).json({ message: "Error actualizando estado" });
  }
});

export default router;
