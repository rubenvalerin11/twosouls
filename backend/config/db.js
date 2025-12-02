import mongoose from "mongoose";

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado con éxito ✔");
  } catch (error) {
    console.error("Error conectando a MongoDB ❌");
    console.error(error);
    process.exit(1);
  }
}

export default connectDB;
