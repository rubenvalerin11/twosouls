import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

console.log("🔍 URI cargada:", uri);

mongoose
  .connect(uri)
  .then(() => {
    console.log("🟢 MongoDB conectado con éxito (TEST) ✔");
    process.exit(0);
  })
  .catch((err) => {
    console.log("❌ Error en conexión TEST:", err);
    process.exit(1);
  });
