{/* CAMISETA */}
<a
  href="/products/diamonds-tee"
  className="bg-white/5 border border-white/10 rounded-xl p-4 shadow-lg hover:bg-white/[0.08] transition"
>
  <img
    src="https://res.cloudinary.com/dukuc8xqm/image/upload/v1763750371/camisafondonuevo_p0ev9n.png"
    className="w-full h-80 object-contain bg-black/20 rounded-lg"
  />
  <h2 className="mt-4 font-medium text-lg">
    TwoSouls Diamonds Black Tee
  </h2>
  <p className="text-white/60">₡23,000</p>
  <button
    disabled
    className="w-full mt-3 py-2 bg-white/10 text-white rounded-lg cursor-not-allowed"
  >
    No disponible
  </button>
</a>

{/* BANDANA */}
<a
  href="/products/bandana-twosouls"
  className="bg-white/5 border border-white/10 rounded-xl p-4 shadow-lg hover:bg-white/[0.08] transition"
>
  <img
    src="https://res.cloudinary.com/dukuc8xqm/image/upload/v1763750373/panuelonew_b2gukh.png"
    className="w-full h-80 object-contain bg-black/20 rounded-lg"
  />
  <h2 className="mt-4 font-medium text-lg">Pañuelo TwoSouls</h2>
  <p className="text-white/60">₡5,000</p>
<button
  onClick={() => alert("Este producto estará disponible en enero.")}
  className="w-full px-6 py-3 bg-white text-black rounded-lg font-semibold transition hover:bg-gray-200"
>
  Agregar al carrito
</button>

</a>