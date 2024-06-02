import mongoose, { Schema, models } from "mongoose";
import connectDatabase from "../config/mongodbConnection";



// await connectDatabase("Product Details");

const sizeType = new Schema({
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});

const productDetailsSchema = new Schema(
  {
    sizes: [sizeType],

    sizeGuide: {
      type: String,
      required: true,
    },


    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    quantity: {
      type: Number,
      required: true,
    },

    about: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductDetail =
  models.ProductDetail || mongoose.model("ProductDetail", productDetailsSchema);

export default ProductDetail;
