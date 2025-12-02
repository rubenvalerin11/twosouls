import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  email: String,
  customer: Object, 
  items: [
    {
      id: String,
      name: String,
      size: String,
      quantity: Number,
      price: Number,
      imageUrl: String,
    },
  ],
  total: Number,
  status: { type: String, default: "pending" },
  createdAt: Date,
});

export default mongoose.model("Order", OrderSchema);
