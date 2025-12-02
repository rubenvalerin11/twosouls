// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export function verifyAdmin(req, res, next) {
  try {
    console.log("COOKIES RECIBIDAS:", req.cookies); // 🔥 DEBUG
    
    let token = req.cookies?.admin_token;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No autorizado (sin token)",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Acceso denegado",
      });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    console.error("verifyAdmin error:", err.message);
    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
    });
  }
}
