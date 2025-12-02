import express from "express";
import Order from "../models/Order.js";
import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";

const router = express.Router();

/* ============================================================================
   POST /api/orders
   CREA ORDEN + GENERA PDF + ENVÍA CORREO
============================================================================ */
router.post("/", async (req, res) => {
  try {
    const { email, items, total, customer } = req.body;

    if (!email || !items || items.length === 0 || !total) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    // ✔ Guardar orden
    const order = await Order.create({
      email,
      items,
      total,
      customer,
      status: "pending",
      createdAt: new Date(),
    });

    // ✔ PDF en memoria
    const doc = new PDFDocument({ margin: 40 });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));

    doc.on("end", async () => {
      const pdfData = Buffer.concat(buffers);

      // ✔ Transport email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // ✔ Enviar email con factura
      await transporter.sendMail({
        from: `"TwoSouls Store" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Factura de compra – TwoSouls",
        text: "Gracias por tu compra. Adjuntamos tu factura.",
        attachments: [
          {
            filename: `factura-${order._id}.pdf`,
            content: pdfData,
          },
        ],
      });

      res.json({
        ok: true,
        message: "Orden creada y factura enviada",
        orderId: order._id,
      });
    });

    /* =======================
       CONTENIDO DEL PDF
    ======================== */
    doc.fontSize(22).text("Factura TwoSouls", { underline: true });
    doc.moveDown();

    doc.fontSize(14).text(`Fecha: ${new Date().toLocaleString()}`);
    doc.text(`Cliente: ${customer || "Sin nombre"}`);
    doc.text(`Correo: ${email}`);
    doc.moveDown();

    doc.fontSize(16).text("Productos:");
    doc.moveDown(0.5);

    items.forEach((item) => {
      doc.fontSize(12).text(
        `${item.name} (Talla ${item.size}) - Cant: ${item.quantity} - ₡${(
          item.price * item.quantity
        ).toLocaleString("es-CR")}`
      );
    });

    doc.moveDown();
    doc.fontSize(16).text(`TOTAL: ₡${total.toLocaleString("es-CR")}`, {
      align: "right",
    });

    doc.end();
  } catch (err) {
    console.error("ERROR ORDEN:", err);
    res.status(500).json({ message: "Error creando orden" });
  }
});

/* ============================================================================
   GET /api/orders
   OBTENER TODAS LAS ÓRDENES
============================================================================ */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo órdenes" });
  }
});

/* ============================================================================
   GET /api/orders/:id
   OBTENER ORDEN POR ID (PROFESIONAL)
============================================================================ */
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    res.json({
      ok: true,
      order,
    });
  } catch (err) {
    console.error("Error al obtener orden:", err);
    res.status(500).json({ message: "Error interno" });
  }
});

/* ============================================================================
   PATCH /api/orders/:id/status
   ACTUALIZAR ESTADO (paid / shipped)
   Usado por el admin panel
============================================================================ */
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "paid", "shipped", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Estado inválido" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    res.json({
      ok: true,
      message: "Estado actualizado",
      order,
    });
  } catch (err) {
    console.error("Error estado orden:", err);
    res.status(500).json({ message: "Error interno" });
  }
});

export default router;
