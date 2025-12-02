// backend/middlewares/verifyAdmin.js

import jwt from "jsonwebtoken";

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token_admin;

  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export default verifyAdmin;
