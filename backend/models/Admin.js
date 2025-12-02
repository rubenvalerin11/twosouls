import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// 🔥 Fuerza a usar la colección EXACTA "admin"
export default mongoose.model("Admin", adminSchema, "admin");
