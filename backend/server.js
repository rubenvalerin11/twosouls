import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
import adminProductRoutes from "./routes/adminProductRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import adminInvoiceRoutes from "./routes/adminInvoiceRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors({
  origin: ["http://localhost:3000", "https://your-frontend-domain.netlify.app"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/orders", adminInvoiceRoutes); // invoice está dentro de orders

// DB & Server
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("🟢 Conectado a MongoDB");
  app.listen(PORT, () => console.log(`🚀 Backend corriendo en http://localhost:${PORT}`));
})
.catch((err) => console.error("❌ Error al conectar con MongoDB:", err));
