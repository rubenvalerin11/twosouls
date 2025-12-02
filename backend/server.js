// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

connectDB();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// RUTAS ADMIN
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import adminProductRoutes from "./routes/adminProductRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
import adminInvoiceRoutes from "./routes/adminInvoiceRoutes.js";

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/admin", adminInvoiceRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
