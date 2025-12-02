export default function TerminosPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4 text-black">
      <h1 className="text-3xl font-bold mb-6">Términos & Políticas · TwoSouls</h1>
      <p className="text-black/70 mb-8">
        Bienvenido a TwoSouls. Estos términos regulan el uso de nuestro sitio web, 
        procesos de compra y manejo de datos. Al realizar una compra o navegar en 
        nuestra plataforma, aceptas nuestras condiciones de uso.
      </p>

      {/* PRIVACIDAD */}
      <h2 className="text-xl font-semibold mt-10 mb-4">1. Políticas de Privacidad</h2>
      <p className="mb-4 text-black/70">
        En TwoSouls respetamos tu privacidad. Toda la información proporcionada 
        (nombre, correo electrónico, teléfono y dirección) se utiliza exclusivamente 
        para procesar tus pedidos y ofrecerte una mejor experiencia de compra.
      </p>
      <p className="mb-4 text-black/70">
        No compartimos tus datos con terceros, excepto proveedores esenciales como 
        servicios de paquetería o procesadores de pago (PayPal, tarjeta o similares).
      </p>
      <p className="text-black/70 mb-4">
        Puedes solicitar la eliminación de tu información personal en cualquier 
        momento escribiendo a nuestro Instagram oficial.
      </p>

      {/* USO */}
      <h2 className="text-xl font-semibold mt-10 mb-4">2. Términos de Uso</h2>
      <p className="mb-4 text-black/70">
        TwoSouls es una tienda de moda urbana y coleccionables exclusivos. El contenido 
        visual, fotografías, descripciones y diseños están protegidos por derechos de 
        autor. No se permite copiar, distribuir o utilizar nuestro material sin permiso.
      </p>
      <p className="mb-4 text-black/70">
        Nos reservamos el derecho de actualizar precios, colecciones o políticas sin 
        previo aviso.
      </p>

      {/* GARANTÍAS LEGALES */}
      <h2 className="text-xl font-semibold mt-10 mb-4">3. Garantías Legales</h2>
      <p className="mb-4 text-black/70">
        Todos los productos cuentan con garantía por <b>defectos de fabricación</b>.  
        El cliente dispone de <b>30 días naturales</b> desde la entrega para reportar 
        fallas. No cubre: desgaste normal, uso indebido, manchas, maltrato o daños 
        causados por el cliente.
      </p>

      {/* DEVOLUCIONES */}
      <h2 className="text-xl font-semibold mt-10 mb-4">4. Reglas de Devolución</h2>
      <p className="mb-4 text-black/70">
        Aceptamos cambios de talla o producto siempre que el artículo esté en perfecto 
        estado, sin uso y con su empaque original. No realizamos reembolsos monetarios, 
        únicamente cambios de talla o crédito en tienda.
      </p>
      <p className="mb-4 text-black/70">
        Las devoluciones deben gestionarse a través de nuestro WhatsApp oficial.
      </p>

      {/* COOKIES */}
      <h2 className="text-xl font-semibold mt-10 mb-4">5. Política de Cookies</h2>
      <p className="mb-4 text-black/70">
        TwoSouls utiliza cookies para mejorar tu experiencia, analizar tráfico y 
        optimizar el funcionamiento del sitio. Puedes desactivar las cookies desde tu 
        navegador, pero algunas funciones podrían verse limitadas.
      </p>

      {/* AVISO LEGAL CR */}
      <h2 className="text-xl font-semibold mt-10 mb-4">6. Aviso Legal (Costa Rica)</h2>
      <p className="mb-4 text-black/70">
        Somos un comercio digital operando bajo la normativa costarricense de protección 
        al consumidor. Al comprar, el cliente acepta nuestras políticas al momento de 
        finalizar su pago.
      </p>

      <p className="mt-10 text-black/50 text-sm">
        Última actualización: {new Date().getFullYear()}
      </p>
    </div>
  );
}
