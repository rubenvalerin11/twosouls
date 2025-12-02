// backend/controllers/adminInvoiceController.js

exports.getInvoiceHTML = (req, res) => {
  const { id } = req.params;

  const html = `
    <html>
      <head>
        <title>Factura #${id}</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          h1 { color: #444; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          td, th { border: 1px solid #ccc; padding: 10px; }
        </style>
      </head>
      <body>
        <h1>Factura #${id}</h1>
        <p>Cliente: Juan Pérez</p>
        <p>Fecha: ${new Date().toLocaleDateString()}</p>
        <table>
          <tr><th>Producto</th><th>Cantidad</th><th>Precio</th></tr>
          <tr><td>Camisa Oversize</td><td>2</td><td>$39.99</td></tr>
          <tr><td>Total</td><td></td><td>$79.98</td></tr>
        </table>
      </body>
    </html>
  `;

  res.send(html);
};
