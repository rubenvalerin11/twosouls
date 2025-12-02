import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temporal

router.post("/upload", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: uuidv4(),
      folder: "twosouls",
    });

    // Eliminar archivo temporal local
    fs.unlinkSync(req.file.path);

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error("Error al subir a Cloudinary:", err);
    res.status(500).json({ message: "Error al subir imagen" });
  }
});

export default router;
