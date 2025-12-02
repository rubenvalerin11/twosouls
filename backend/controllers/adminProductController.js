export const getProducts = (req, res) => {
  res.json([
    { id: "1", name: "Camiseta negra", price: 25000 },
    { id: "2", name: "Sudadera blanca", price: 32000 },
  ]);
};

export const createProduct = (req, res) => {
  const { name, price } = req.body;
  res.status(201).json({ message: "Producto creado", product: { name, price } });
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  res.json({ message: `Producto ${id} actualizado`, updated: { name, price } });
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Producto ${id} eliminado` });
};
