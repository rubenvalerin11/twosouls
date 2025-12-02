"use client";

import { useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { useCart } from "../context/CartContext";
import PayPalButton from "../components/PayPalButton";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [notes, setNotes] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const shipping = 0; // por ahora igual que tu lógica
  const total = subtotal + shipping;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name || !email) {
      setErrorMsg("Por favor, ingresa tu nombre y correo.");
      return;
    }

    if (items.length === 0) {
      setErrorMsg("Tu carrito está vacío.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            items,
            total,
            customer: {
              name,
              phone,
              address,
              province,
              city,
              postalCode,
              notes,
              shippingMethod,
              method: "manual-checkout",
            },
          }),
        }
      );

      if (!res.ok) throw new Error("Error al crear la orden.");

      clearCart();
      setSuccessMsg("✔ Pedido recibido — revisa tu correo.");
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudo procesar el pedido. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f4f3f1] min-h-screen">
      {/* SDK PAYPAL */}
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`}
        strategy="afterInteractive"
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">
          Finalizar compra
        </h1>

        <div className="grid gap-8 lg:grid-cols-[2fr,1.3fr]">
          {/* COLUMNA IZQUIERDA – ESTILO SHOPIFY */}
          <div className="bg-white rounded-2xl border border-black/10 p-6 space-y-6">
            {/* PASO 1: CONTACTO */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-black/60 mb-4">
                Contacto
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-black/60 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="w-full border border-black/20 bg-transparent px-3 py-2 text-sm outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-black/60 mb-1">
                    Teléfono (opcional)
                  </label>
                  <input
                    className="w-full border border-black/20 bg-transparent px-3 py-2 text-sm outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Número de WhatsApp"
                  />
                </div>
              </div>
            </section>

            <hr className="border-black/10" />

            {/* PASO 2: ENTREGA */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-black/60 mb-4">
                Entrega
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-black/60 mb-1">
                    Nombre completo
                  </label>
                  <input
                    className="w-full border border-black/20 bg-transparent px-3 py-2 text-sm outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-black/60 mb-1">
                    Dirección
                  </label>
                  <input
                    className="w-full border border-black/20 bg-transparent px-3 py-2 text-sm outline-none"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Casa, apartamento, referencias"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-black/60 mb-1">
                      Provincia
                    </label>
                    <input
                      className="w-full border border-black/20 bg-transparent px-3 py-2 text-sm outline-none"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      placeholder="Provincia"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-black/60 mb-1">
                      Ciudad
                    </label>
                    <input
                      className="w-full border border-black/20 bg-transparent px-3 py-2 text-sm outline-none"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Cantón / Distrito"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-black/60 mb-1">
                      Código postal (opcional)
                    </label>
                    <input
                      className="w-full border border-black/20 bg-transparent px-3 py-2 text-sm outline-none"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="Ej. 10101"
                    />
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-black/10" />

            {/* PASO 3: MÉTODOS DE ENVÍO */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-black/60 mb-4">
                Métodos de envío
              </h2>

              <div className="space-y-2 text-sm">
                <label className="flex items-center justify-between border border-black/20 rounded-xl px-3 py-2 cursor-pointer bg-black/5">
                  <div>
                    <p className="font-medium">Standard</p>
                    <p className="text-xs text-black/60">
                      Entrega coordinada por WhatsApp / Instagram
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold">
                      {shipping === 0 ? "Por confirmar" : `₡${shipping}`}
                    </span>
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "standard"}
                      onChange={() => setShippingMethod("standard")}
                    />
                  </div>
                </label>
              </div>
            </section>

            <hr className="border-black/10" />

            {/* PASO 4: PAGO */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-black/60 mb-4">
                Pago
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-black/60 mb-1">
                    Notas del pedido (opcional)
                  </label>
                  <textarea
                    className="w-full border border-black/20 bg-transparent px-3 py-2 text-sm outline-none min-h-[80px]"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Indicaciones especiales, horarios de entrega, etc."
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-600">{errorMsg}</p>
                )}
                {successMsg && (
                  <p className="text-xs text-green-600">{successMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || items.length === 0}
                  className="mt-2 w-full rounded-full bg-black py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white disabled:bg-black/30"
                >
                  {loading ? "Procesando..." : "Finalizar compra"}
                </button>
              </form>

              {/* PAYPAL */}
              {items.length > 0 && total > 0 && (
                <div className="mt-6">
                  <p className="text-[0.7rem] text-black/60 mb-2 uppercase tracking-[0.2em]">
                    O paga con PayPal
                  </p>
                  <PayPalButton
                    total={total}
                    onSuccess={async (data: any) => {
                      try {
                        const res = await fetch(
                          `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              email,
                              items,
                              total,
                              customer: {
                                name,
                                phone,
                                address,
                                province,
                                city,
                                postalCode,
                                notes,
                                shippingMethod,
                                paypalOrderId: data.id,
                                method: "paypal",
                              },
                            }),
                          }
                        );

                        if (!res.ok) {
                          throw new Error(
                            "Error al registrar la orden PayPal."
                          );
                        }

                        clearCart();
                        setSuccessMsg(
                          "✔ Pago procesado con PayPal — revisa tu correo."
                        );
                        setErrorMsg("");
                      } catch (err) {
                        console.error(err);
                        setErrorMsg(
                          "Se procesó el pago en PayPal, pero hubo un problema registrando la orden. Escríbenos por Instagram."
                        );
                      }
                    }}
                  />
                </div>
              )}

              <p className="mt-4 text-[0.7rem] text-black/50">
                Tus pagos se procesan de forma segura. También podemos coordinar
                pagos por SINPE móvil después de recibir tu pedido.
              </p>
            </section>
          </div>

          {/* COLUMNA DERECHA – RESUMEN (TU DISEÑO) */}
          <div className="bg-white rounded-2xl border border-black/10 p-5 h-fit">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-black/60 mb-4">
              Resumen de tu pedido
            </h2>

            {items.length === 0 ? (
              <p className="text-sm text-black/60">
                Tu carrito está vacío.
              </p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4 border-b border-black/5 pb-4"
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-black/5">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-black/60">
                        Talla: {item.size} · Cantidad: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold mt-1">
                        ₡
                        {(item.price * item.quantity).toLocaleString("es-CR")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 space-y-1 text-sm">
              <div className="flex justify-between text-black/70">
                <span>Subtotal</span>
                <span>₡{subtotal.toLocaleString("es-CR")}</span>
              </div>

              <div className="flex justify-between text-black/60">
                <span>Envío</span>
                <span>{shipping === 0 ? "Por confirmar" : `₡${shipping}`}</span>
              </div>

              <div className="flex justify-between text-base font-semibold mt-2">
                <span>Total</span>
                <span>₡{total.toLocaleString("es-CR")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
