// backend/routes/adminInvoiceRoutes.js
import express from "express";
import { getInvoiceHTML } from "../controllers/adminInvoiceController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js"; // ✅

const router = express.Router();

router.get("/orders/:id/invoice", verifyAdmin, getInvoiceHTML);

export default router;
