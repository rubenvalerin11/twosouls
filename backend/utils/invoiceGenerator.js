import PDFDocument from "pdfkit";
import fs from "fs";

export function generateInvoice(order) {
  const filePath = `invoices/invoice-${order._id}.pdf`;

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("Factura TwoSouls", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Número de orden: ${order._id}`);
  doc.text(`Fecha: ${new Date().toLocaleString()}`);
  doc.moveDown();

  doc.text("Items:");
  order.items.forEach((item) => {
    doc.text(
      `   - ${item.name} (${item.size}) x${item.qty}  – ₡${item.price * item.qty}`
    );
  });

  doc.moveDown();
  doc.fontSize(14).text(`Total: ₡${order.total}`, { bold: true });

  doc.end();
  return filePath;
}
