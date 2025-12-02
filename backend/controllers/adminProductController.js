// backend/controllers/adminProductController.js

export const getAllProducts = (req, res) => {
  const products = [
    {
      _id: "p1",
      name: "Camisa Oversize",
      price: 39.99,
      stock: 10,
      image: "https://source.unsplash.com/400x300/?shirt",
    },
    {
      _id: "p2",
      name: "Pantalón Wide Leg",
      price: 49.99,
      stock: 8,
      image: "https://source.unsplash.com/400x300/?pants",
    },
  ];

  res.status(200).json(products);
};
