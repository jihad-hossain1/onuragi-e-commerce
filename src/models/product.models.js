import mongoose, { Schema, models } from "mongoose";


const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    parentCat: {
      type: String,
    },
    catName: {
      type: String,
    },
    sCatId: {
      type: String,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    PID: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
    },
    defaultColor: {
      type: String,
      required: [true, "Please provide default color"],
      max: [20, "Name cannot be more than 20 characters"],
    },
    defaultSize: {
      type: String,
      required: [true, "Please provide default size"],
      max: [20, "Name cannot be more than 20 characters"],
    },
    specification: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductSpecification",
    },
    details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductDetail",
    },
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", productSchema);

export default Product;
