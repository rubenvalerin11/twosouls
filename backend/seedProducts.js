// backend/seedProducts.js
import mongoose from "mongoose";
import Product from "./models/Product.js";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Conectado a MongoDB…");

  await Product.deleteMany({});
  console.log("Productos anteriores eliminados.");

  const products = [
    {
      name: "TwoSouls Diamonds Black Tee",
      price: 23000,
      stock: 10,
      description: "Edición limitada premium con detalles TwoSouls.",
      imageUrl:
        "https://res.cloudinary.com/dukuc8xqm/image/upload/v1763750371/camisafondonuevo_p0ev9n.png",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Bandana TwoSouls – Limited Edition",
      price: 5000,
      stock: 50,
      description:
        "Pañuelo edición limitada con detalles premium TwoSouls.",
      imageUrl:
        "https://res.cloudinary.com/dukuc8xqm/image/upload/v1763750373/panuelonew_b2gukh.png",
      sizes: [],
    },
  ];

  await Product.insertMany(products);

  console.log("Productos agregados correctamente:");
  console.log(products);
  process.exit();
}

seed().catch((err) => console.error(err));
