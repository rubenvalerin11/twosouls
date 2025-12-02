import express from "express";
import { verifyAdmin } from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const router = express.Router();

// /api/admin/dashboard
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    return res.json({
      success: true,
      metrics: {
        totalOrders,
        totalProducts,
        totalUsers,
        recentOrders,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error obteniendo métricas",
    });
  }
});

export default router;
