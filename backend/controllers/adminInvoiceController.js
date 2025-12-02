export const getInvoiceHTML = async (req, res) => {
  try {
    const orderId = req.params.id;

    // ⚠️ MOCK DATA - Esto se conecta a tu modelo real de Order más adelante
    const mockOrder = {
      _id: orderId,
      customer: "Juan Pérez",
      items: [
        { name: "Camiseta Negra", quantity: 2, price: 25 },
        { name: "Jeans Azul", quantity: 1, price: 40 },
      ],
      total: 90,
      status: "completed",
      createdAt: new Date(),
    };

    const invoiceHTML = `
      <html>
        <head>
          <title>Factura ${mockOrder._id}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
            th { background-color: #f8f8f8; }
          </style>
        </head>
        <body>
          <h1>Factura de Pedido</h1>
          <p><strong>Cliente:</strong> ${mockOrder.customer}</p>
          <p><strong>ID del pedido:</strong> ${mockOrder._id}</p>
          <p><strong>Estado:</strong> ${mockOrder.status}</p>
          <p><strong>Fecha:</strong> ${new Date(mockOrder.createdAt).toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              ${mockOrder.items
                .map(
                  (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price.toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <h3>Total: $${mockOrder.total.toFixed(2)}</h3>
        </body>
      </html>
    `;

    res.set("Content-Type", "text/html");
    res.send(invoiceHTML);
  } catch (error) {
    console.error("Error generando factura:", error);
    res.status(500).json({ error: "No se pudo generar la factura" });
  }
};
