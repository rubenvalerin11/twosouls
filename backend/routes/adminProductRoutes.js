// backend/routes/adminProductRoutes.js
import express from "express";
import { getAllProducts } from "../controllers/adminProductController.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/products", verifyAdmin, getAllProducts);

export default router;
