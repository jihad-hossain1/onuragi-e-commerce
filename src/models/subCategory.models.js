import mongoose, { Schema, models } from "mongoose";


import connectDatabase from "../config/mongodbConnection";

// await connectDatabase("Product SubCategory");

const productSubCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const SubCategory =
  models.SubCategory || mongoose.model("SubCategory", productSubCategorySchema);

export default SubCategory;
