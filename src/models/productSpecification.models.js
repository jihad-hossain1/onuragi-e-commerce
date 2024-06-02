import mongoose, { Schema, models } from "mongoose";
import connectDatabase from "../config/mongodbConnection";

// await connectDatabase("Product Specification");

const productSpecificationSchema = new Schema(
  {
    care: [String],

    febric: [String],

    sleeve: String,

    valueAddition: String,

    coller_Neck: String,

    sideCut: String,

    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const ProductSpecification =
  models.ProductSpecification ||
  mongoose.model("ProductSpecification", productSpecificationSchema);

export default ProductSpecification;
