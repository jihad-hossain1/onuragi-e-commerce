import mongoose, { Schema, models } from "mongoose";
import connectDatabase from "../config/mongodbConnection";

await connectDatabase();


const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", productSchema);

export default Product;
