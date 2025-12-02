// verifyAdmin.js
import jwt from "jsonwebtoken";

export function verifyAdmin(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. No hay token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Solo administradores pueden acceder." });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido." });
  }
}
