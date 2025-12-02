import express from "express";
import { getDashboardMetrics } from "../controllers/adminDashboardController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/", verifyAdmin, getDashboardMetrics);

export default router;
