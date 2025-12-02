// backend/controllers/adminAuthController.js
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Credenciales inválidas",
    });
  }

  const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, {
    expiresIn: "8h",
  });

  console.log("LOGIN: generando cookie admin_token →", token.substring(0, 20)); // 🔥 DEBUG

  res.cookie("admin_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return res.json({ success: true });
};
