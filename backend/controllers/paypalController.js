import fetch from "node-fetch";

// Crear orden de PayPal
export async function createPayPalOrder(req, res) {
  try {
    const accessToken = await generateAccessToken();

    const order = await fetch(
      `${process.env.PAYPAL_API}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: req.body.amount || "1.00"
              }
            }
          ]
        })
      }
    );

    const data = await order.json();

    return res.status(201).json(data);

  } catch (error) {
    console.error("Error PayPal create:", error);
    return res.status(500).json({ message: "Error creando orden de PayPal" });
  }
}

// Capturar pago de PayPal
export async function capturePayPalOrder(req, res) {
  try {
    const { orderId } = req.params;
    const accessToken = await generateAccessToken();

    const response = await fetch(
      `${process.env.PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const data = await response.json();

    return res.json(data);

  } catch (error) {
    console.error("Error PayPal capture:", error);
    return res.status(500).json({ message: "Error capturando orden" });
  }
}

// Generar token de PayPal
async function generateAccessToken() {
  const response = await fetch(
    `${process.env.PAYPAL_API}/v1/oauth2/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
          ).toString("base64")
      },
      body: "grant_type=client_credentials"
    }
  );

  const data = await response.json();
  return data.access_token;
}
