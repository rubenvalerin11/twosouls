"use client";
import { useEffect } from "react";

export default function PayPalButton({ total, onSuccess }) {
  useEffect(() => {
    let isMounted = true;

    function renderButton() {
      if (!isMounted) return;
      if (!window.paypal) return;

      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: { value: total.toString() },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const details = await actions.order.capture();
            onSuccess(details);
          },
        })
        .render("#paypal-button-container");
    }

    // Intentar varias veces por si el SDK tarda en cargar
    const interval = setInterval(() => {
      if (window.paypal) {
        clearInterval(interval);
        renderButton();
      }
    }, 300);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [total, onSuccess]);

  return <div id="paypal-button-container"></div>;
}
