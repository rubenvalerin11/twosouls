import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

// Configurar Cloudinary desde variables de entorno
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ruta: POST /api/admin/upload
router.post("/", verifyAdmin, upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No se subió ningún archivo" });

    // Subir a Cloudinary desde el buffer
    const result = await cloudinary.uploader.upload_stream(
      { folder: "twosouls" },
      (error, result) => {
        if (error) return res.status(500).json({ error: "Error al subir a Cloudinary" });

        return res.json({ url: result.secure_url });
      }
    );

    // Pipe del buffer a Cloudinary
    const streamifier = await import("streamifier");
    streamifier.default.createReadStream(file.buffer).pipe(result);
  } catch (error) {
    console.error("Error al subir imagen:", error);
    res.status(500).json({ error: "Falló la subida de imagen" });
  }
});

export default router;
