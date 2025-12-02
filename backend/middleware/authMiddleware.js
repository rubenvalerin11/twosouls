import jwt from "jsonwebtoken";

export function verifyAdmin(req, res, next) {
  try {
    // 1️⃣ Leer token desde cookie
    let token = req.cookies?.admin_token;

    // 2️⃣ Leer token desde Authorization si no viene en cookie
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 3️⃣ Si no hay token → 401
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No autorizado (sin token)",
      });
    }

    // 4️⃣ Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Acceso denegado",
      });
    }

    // 5️⃣ Guardar admin
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
