import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/adminProductController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/", verifyAdmin, getProducts);
router.post("/", verifyAdmin, createProduct);
router.put("/:id", verifyAdmin, updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);

export default router;
