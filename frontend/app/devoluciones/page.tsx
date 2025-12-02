export default function DevolucionesPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4 text-black">
      <h1 className="text-3xl font-bold mb-6">Política de Devoluciones · TwoSouls</h1>

      <p className="text-black/70 mb-6">
        En TwoSouls queremos que estés completamente satisfecho con tus compras.  
        Por eso aplicamos una política clara, rápida y justa.
      </p>

      <h2 className="text-xl font-semibold mb-4">1. Cambios de talla o producto</h2>
      <p className="mb-4 text-black/70">
        Aceptamos cambios dentro de los primeros <b>7 días naturales</b> posteriores 
        a la entrega, siempre que el producto se encuentre en perfecto estado, sin uso, 
        sin manchas y con su empaque original.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-10">2. Productos no elegibles</h2>
      <ul className="list-disc ml-6 text-black/70">
        <li>Artículos usados</li>
        <li>Prendas lavadas o con olor</li>
        <li>Stickers ya removidos de su backing</li>
        <li>Productos en promoción especial</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4 mt-10">3. ¿Cómo solicitar un cambio?</h2>
      <p className="mb-4 text-black/70">
        Envíanos un mensaje por WhatsApp con:
      </p>
      <ul className="list-disc ml-6 mb-4 text-black/70">
        <li>Nombre completo</li>
        <li>Número de pedido</li>
        <li>Foto del producto</li>
        <li>Nueva talla o producto deseado</li>
      </ul>

      <p className="mb-4 text-black/70">
        Te guiaremos con el proceso de envío del artículo.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-10">4. Reembolsos</h2>
      <p className="text-black/70">
        TwoSouls no realiza reembolsos monetarios.  
        Ofrecemos cambio por otro producto o crédito en tienda.
      </p>
    </div>
  );
}
