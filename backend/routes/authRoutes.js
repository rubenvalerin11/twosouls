import express from "express";
import { register, login, getProfile } from "../controllers/authController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js"; // ← correcto

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Esta ruta queda protegida por verifyAdmin
router.get("/profile", verifyAdmin, getProfile);

export default router;
