import mongoose, { Schema, models } from "mongoose";


const productCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  subCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
});

const Category =
  models.Category || mongoose.model("Category", productCategorySchema);

export default Category;
