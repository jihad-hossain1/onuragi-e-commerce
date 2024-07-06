import mongoose, { models, Schema } from "mongoose";

const ecomDelivery = new Schema(
  {
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    payInfo: {
      tid: { type: String },
      sc: { type: String },
      method: { type: String },
    },
    address: {
      street: { type: String },
      city: { type: String },
      zipCode: { type: String },
    },
    totalPrice: { type: Number },
    status: {
      type: String,
      enum: [
        "pending",
        "delivered",
        "shipped",
        "returned",
        "cancelled",
        "failed",
        "refunded",
        "processing",
      ],
      default: "pending",
    },
    did: { type: String },
  },
  {
    timestamps: true,
  }
);

const EcomDelivery =
  models.EcomDelivery || mongoose.model("EcomDelivery", ecomDelivery);

export default EcomDelivery;
