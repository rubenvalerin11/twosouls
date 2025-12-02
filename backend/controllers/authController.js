import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Crear token JWT
function createToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// Registro
export async function register(req, res) {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
    });

    const token = createToken(user);
    return res.json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: "Error en el registro" });
  }
}

// Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = createToken(user);
    return res.json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: "Error en el login" });
  }
}

// 🚀 ESTA ES LA FUNCIÓN QUE FALTABA
export async function getProfile(req, res) {
  try {
    // req.user lo trae authMiddleware
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener perfil" });
  }
}
