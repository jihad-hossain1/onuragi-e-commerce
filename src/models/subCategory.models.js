import mongoose, { Schema, models } from "mongoose";

const productSubCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const SubCategory =
  models.SubCategory || mongoose.model("SubCategory", productSubCategorySchema);

export default SubCategory;
